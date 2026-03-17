import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { getSupabaseServer } from '@/lib/supabase-server';
import { autoShipOrder } from '@/lib/shippo';
import { DEFAULT_WEIGHTS } from '@/lib/shipping';
import {
  sendOrderConfirmationEmail,
  sendOrderShippedEmail,
  type OrderData,
  type OrderItem,
} from '@/lib/email';

function verifySquareSignature(
  body: string,
  signature: string | null,
  signatureKey: string,
  notificationUrl: string
): boolean {
  if (!signature) return false;
  const hmac = createHmac('sha256', signatureKey);
  hmac.update(notificationUrl + body);
  const expected = hmac.digest('base64');
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

/** Find or create a contact by email, return contact_id */
async function findOrCreateContact(
  supabase: ReturnType<typeof getSupabaseServer>,
  email: string,
  name?: string,
  phone?: string
): Promise<number | null> {
  if (!supabase || !email) return null;

  const { data: existing } = await supabase
    .from('contacts')
    .select('id')
    .eq('email', email.toLowerCase())
    .limit(1)
    .single();

  if (existing) return existing.id;

  const nameParts = (name || '').split(' ');
  const { data: newContact } = await supabase.from('contacts').insert({
    email: email.toLowerCase(),
    firstname: nameParts[0] || null,
    lastname: nameParts.slice(1).join(' ') || null,
    phone: phone || null,
    source: 'purchase',
    lead_status: 'CUSTOMER',
    lifecycle_stage: 'customer',
  }).select('id').single();

  return newContact?.id ?? null;
}

export async function POST(req: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim();
  const notificationUrl = (process.env.SQUARE_WEBHOOK_URL?.trim()) ?? 'https://valuesuppliers.co/api/square/webhook';

  const rawBody = await req.text();
  const signature = req.headers.get('x-square-hmacsha256-signature');

  if (!signatureKey) {
    console.error('[Square Webhook] SQUARE_WEBHOOK_SIGNATURE_KEY not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }
  if (!verifySquareSignature(rawBody, signature, signatureKey, notificationUrl)) {
    console.error('[Square Webhook] Signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: { type: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const supabase = getSupabaseServer();

  switch (event.type) {
    case 'payment.created':
    case 'payment.updated': {
      const paymentObj = event.data?.object as Record<string, unknown> | undefined;
      const payment = paymentObj?.payment as Record<string, unknown> | undefined;
      if (!payment || !supabase) break;

      // Only process completed payments
      const paymentStatus = (payment.status as string) || '';
      if (paymentStatus !== 'COMPLETED') {
        break;
      }

      const orderId = payment.order_id as string | undefined;
      const amountMoney = payment.amount_money as { amount?: number; currency?: string } | undefined;
      const totalCents = amountMoney?.amount ?? 0;
      const currency = amountMoney?.currency ?? 'USD';
      const buyerEmail = (payment.buyer_email_address as string) || '';
      const receiptUrl = payment.receipt_url as string | undefined;

      // Deduplicate — skip if we already processed this payment
      const paymentId = payment.id as string;
      if (paymentId) {
        const { data: existingOrder } = await supabase
          .from('orders')
          .select('id')
          .eq('square_payment_id', paymentId)
          .limit(1)
          .single();
        if (existingOrder) {
          break;
        }
      }

      // Shipping address from payment
      const shippingAddr = payment.shipping_address as Record<string, string> | undefined;

      // Find or create CRM contact
      const contactId = await findOrCreateContact(supabase, buyerEmail);

      // Update contact to customer status if they were a lead
      if (contactId) {
        await supabase.from('contacts').update({
          lead_status: 'CUSTOMER',
          lifecycle_stage: 'customer',
        }).eq('id', contactId);
      }

      // Create order record
      const { data: order } = await supabase.from('orders').insert({
        contact_id: contactId,
        square_order_id: orderId || null,
        square_payment_id: payment.id as string || null,
        status: 'paid',
        total: totalCents / 100,
        currency,
        email: buyerEmail,
        shipping_name: shippingAddr ? `${shippingAddr.first_name || ''} ${shippingAddr.last_name || ''}`.trim() : null,
        shipping_address_line1: shippingAddr?.address_line_1 || null,
        shipping_address_line2: shippingAddr?.address_line_2 || null,
        shipping_city: shippingAddr?.locality || null,
        shipping_state: shippingAddr?.administrative_district_level_1 || null,
        shipping_zip: shippingAddr?.postal_code || null,
        shipping_country: shippingAddr?.country || 'US',
        notes: receiptUrl ? `Receipt: ${receiptUrl}` : null,
      }).select('id').single();

      // Try to get line items from the order via Square API
      if (orderId && order) {
        try {
          const squareToken = process.env.SQUARE_ACCESS_TOKEN?.trim();
          if (squareToken) {
            const orderRes = await fetch(`https://connect.squareup.com/v2/orders/${orderId}`, {
              headers: { 'Authorization': `Bearer ${squareToken}`, 'Content-Type': 'application/json' },
            });
            if (orderRes.ok) {
              const orderData = await orderRes.json();
              const lineItems = orderData.order?.line_items || [];
              for (const item of lineItems) {
                // Skip shipping line item — it's not a product
                if ((item.name || '').toLowerCase().startsWith('shipping')) continue;

                const parsedQty = parseInt(item.quantity || '1', 10);
                await supabase.from('order_items').insert({
                  order_id: order.id,
                  product_name: item.name || 'Unknown',
                  sku: item.catalog_object_id || null,
                  quantity: Number.isNaN(parsedQty) || parsedQty < 1 ? 1 : parsedQty,
                  unit_price: (item.base_price_money?.amount || 0) / 100,
                  total_price: (item.total_money?.amount || 0) / 100,
                });
              }
            }
          }
        } catch (err) {
          console.error('[Square] Failed to fetch order line items:', err instanceof Error ? err.message : 'unknown error');
        }
      }

      // Send order confirmation email (non-blocking — don't fail webhook on email error)
      if (order && buyerEmail) {
        try {
          const { data: savedItems } = await supabase
            .from('order_items')
            .select('product_name, quantity, unit_price, total_price')
            .eq('order_id', order.id);

          const emailOrderData: OrderData = {
            id: order.id,
            email: buyerEmail,
            total: totalCents / 100,
            currency,
            items: (savedItems || []) as OrderItem[],
            shipping_name: shippingAddr ? `${shippingAddr.first_name || ''} ${shippingAddr.last_name || ''}`.trim() : null,
            shipping_address_line1: shippingAddr?.address_line_1 || null,
            shipping_address_line2: shippingAddr?.address_line_2 || null,
            shipping_city: shippingAddr?.locality || null,
            shipping_state: shippingAddr?.administrative_district_level_1 || null,
            shipping_zip: shippingAddr?.postal_code || null,
            shipping_country: shippingAddr?.country || 'US',
          };

          await sendOrderConfirmationEmail(buyerEmail, emailOrderData);
        } catch (emailErr) {
          console.error('[Email] Order confirmation failed for order', order.id, emailErr instanceof Error ? emailErr.message : 'unknown');
        }
      }

      // Auto-ship: create Shippo shipment, pick cheapest rate, buy label
      if (order && shippingAddr?.address_line_1 && shippingAddr?.locality) {
        try {
          const shipToName = `${shippingAddr.first_name || ''} ${shippingAddr.last_name || ''}`.trim();

          // Estimate weight from line items or fallback to order total
          let weightLbs = 0;
          if (orderId) {
            const { data: items } = await supabase.from('order_items').select('product_name, quantity').eq('order_id', order.id);
            if (items && items.length > 0) {
              for (const item of items) {
                // Match product name by keyword — Square names include extra text like "(Case of 10)"
                const nameLower = (item.product_name || '').toLowerCase();
                let w = 5; // default fallback
                if (nameLower.includes('case')) w = DEFAULT_WEIGHTS['nitrile-5mil-case'] ?? 65;
                else if (nameLower.includes('box')) w = DEFAULT_WEIGHTS['nitrile-5mil-box'] ?? 6.5;
                weightLbs += w * (item.quantity || 1);
              }
            }
          }
          // Minimum 5 lbs, fallback estimate from total ($1 ≈ 0.5 lbs for glove cases)
          if (weightLbs <= 0) {
            weightLbs = Math.max(5, Math.round((totalCents / 100) * 0.5));
          }

          const shipResult = await autoShipOrder(
            {
              name: shipToName || 'Customer',
              street1: shippingAddr.address_line_1,
              street2: shippingAddr.address_line_2 || '',
              city: shippingAddr.locality,
              state: shippingAddr.administrative_district_level_1 || '',
              zip: shippingAddr.postal_code || '',
              country: shippingAddr.country || 'US',
              email: buyerEmail,
            },
            weightLbs,
          );

          if (shipResult) {
            await supabase.from('orders').update({
              status: 'shipped',
              tracking_number: shipResult.trackingNumber,
              tracking_url: shipResult.trackingUrl,
              label_url: shipResult.labelUrl,
              shippo_shipment_id: shipResult.shipmentId,
              shippo_transaction_id: shipResult.transactionId,
              shipping_carrier: shipResult.carrier,
              shipping_service: shipResult.service,
              shipped_at: new Date().toISOString(),
            }).eq('id', order.id);

            // Send order shipped email with tracking info
            if (buyerEmail) {
              try {
                const { data: savedItems } = await supabase
                  .from('order_items')
                  .select('product_name, quantity, unit_price, total_price')
                  .eq('order_id', order.id);

                const shippedOrderData: OrderData = {
                  id: order.id,
                  email: buyerEmail,
                  total: totalCents / 100,
                  currency,
                  items: (savedItems || []) as OrderItem[],
                  shipping_name: shippingAddr ? `${shippingAddr.first_name || ''} ${shippingAddr.last_name || ''}`.trim() : null,
                  shipping_address_line1: shippingAddr?.address_line_1 || null,
                  shipping_address_line2: shippingAddr?.address_line_2 || null,
                  shipping_city: shippingAddr?.locality || null,
                  shipping_state: shippingAddr?.administrative_district_level_1 || null,
                  shipping_zip: shippingAddr?.postal_code || null,
                  shipping_country: shippingAddr?.country || 'US',
                };

                await sendOrderShippedEmail(buyerEmail, shippedOrderData, {
                  tracking_number: shipResult.trackingNumber,
                  shipping_carrier: shipResult.carrier,
                  tracking_url: shipResult.trackingUrl,
                  shipping_service: shipResult.service,
                });
              } catch (emailErr) {
                console.error('[Email] Shipped notification failed for order', order.id, emailErr instanceof Error ? emailErr.message : 'unknown');
              }
            }
          } else {
            console.error('[Shippo] Auto-ship failed for order', order.id);
          }
        } catch (shipErr) {
          // Don't fail the webhook if shipping fails — order is still saved
          console.error('[Shippo] Auto-ship error for order', order?.id, shipErr instanceof Error ? shipErr.message : 'unknown error');
        }
      }

      break;
    }

    case 'order.fulfillment.updated': {
      const orderObj = event.data?.object as Record<string, unknown> | undefined;
      const fulfillment = orderObj?.order_fulfillment_updated as Record<string, unknown> | undefined;
      const sqOrderId = fulfillment?.order_id as string | undefined;

      if (supabase && sqOrderId) {
        const fulfillments = fulfillment?.fulfillment_update as Array<{ new_state?: string }> | undefined;
        const latestState = fulfillments?.[0]?.new_state;
        const statusMap: Record<string, string> = {
          PROPOSED: 'processing',
          RESERVED: 'processing',
          PREPARED: 'processing',
          COMPLETED: 'shipped',
          CANCELED: 'cancelled',
          FAILED: 'cancelled',
        };
        const newStatus = statusMap[latestState || ''] || 'processing';

        await supabase.from('orders').update({ status: newStatus }).eq('square_order_id', sqOrderId);
        // Fulfillment status updated
      }
      break;
    }

    case 'subscription.created':
    case 'subscription.updated': {
      const subObj = event.data?.object as Record<string, unknown> | undefined;
      const subscription = subObj?.subscription as Record<string, unknown> | undefined;
      if (supabase && subscription) {
        const subId = subscription.id as string;
        const status = subscription.status as string;

        // Update any orders linked to this subscription
        if (status === 'CANCELED' || status === 'PAUSED') {
          await supabase.from('orders').update({
            status: status === 'CANCELED' ? 'cancelled' : 'paused',
          }).eq('subscription_id', subId);
        }

        // Subscription event processed
      }
      break;
    }

    case 'invoice.payment_made': {
      // Subscription renewal processed
      break;
    }

    case 'invoice.payment_failed': {
      console.error('[Square] invoice.payment_failed — dunning needed');
      break;
    }

    default:
      // Unhandled event type — no action required
  }

  return NextResponse.json({ received: true });
}
