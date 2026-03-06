import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

// Square webhook signature verification
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
  return expected === signature;
}

export async function POST(req: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_URL ?? 'https://valuesuppliers.co/api/square/webhook';

  const rawBody = await req.text();
  const signature = req.headers.get('x-square-hmacsha256-signature');

  if (signatureKey && !verifySquareSignature(rawBody, signature, signatureKey, notificationUrl)) {
    console.error('[Square Webhook] Signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: { type: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment.completed': {
      const payment = event.data?.object as { payment?: { order_id?: string; amount_money?: { amount?: number } } } | undefined;
      console.log('[Square] payment.completed — order:', payment?.payment?.order_id);
      // TODO: fulfill order, send confirmation email, update Supabase order record
      break;
    }

    case 'order.fulfillment.updated': {
      console.log('[Square] order.fulfillment.updated');
      // TODO: update order status, notify customer
      break;
    }

    case 'subscription.created': {
      const sub = event.data?.object as { subscription?: { id?: string; customer_id?: string } } | undefined;
      console.log('[Square] subscription.created:', sub?.subscription?.id);
      // TODO: store subscription ID in Supabase, send welcome email
      break;
    }

    case 'subscription.updated': {
      const sub = event.data?.object as { subscription?: { id?: string; status?: string } } | undefined;
      console.log('[Square] subscription.updated — status:', sub?.subscription?.status);
      // TODO: handle paused/cancelled/reactivated status changes
      break;
    }

    case 'invoice.payment_made': {
      console.log('[Square] invoice.payment_made — subscription renewal processed');
      // TODO: log renewal, trigger shipment
      break;
    }

    case 'invoice.payment_failed': {
      console.error('[Square] invoice.payment_failed — notify customer');
      // TODO: send dunning email, pause subscription
      break;
    }

    default:
      console.log(`[Square] unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
