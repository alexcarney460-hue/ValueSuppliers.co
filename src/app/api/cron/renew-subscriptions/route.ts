import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getSupabaseServer } from '@/lib/supabase-server';
import { squareClient, SQUARE_LOCATION_ID } from '@/lib/square';
import PRODUCTS, { getCasePriceForQuantity } from '@/lib/products';
import { sendRenewalReminderEmail } from '@/lib/email';
import { computeNextRenewal, type SubscriptionFrequency } from '@/lib/subscriptions';

// ---------------------------------------------------------------------------
// GET /api/cron/renew-subscriptions
// Vercel Cron hits this daily. Protected by CRON_SECRET header.
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sets this automatically for cron jobs)
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization');

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Database unavailable.' }, { status: 500 });
  }

  if (!squareClient || !SQUARE_LOCATION_ID) {
    return NextResponse.json({ error: 'Square not configured.' }, { status: 500 });
  }

  const now = new Date().toISOString();

  // Fetch active subscriptions due for renewal
  const { data: dueSubs, error: queryError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('status', 'active')
    .lte('next_renewal_at', now)
    .limit(50); // Process in batches to stay within function timeout

  if (queryError) {
    console.error('[Cron] Failed to query subscriptions:', queryError.message);
    return NextResponse.json({ error: 'Query failed.' }, { status: 500 });
  }

  if (!dueSubs || dueSubs.length === 0) {
    return NextResponse.json({ processed: 0, message: 'No subscriptions due.' });
  }

  let processed = 0;
  let errors = 0;

  for (const sub of dueSubs) {
    try {
      const items = sub.items as Array<{
        slug: string;
        name: string;
        quantity: number;
        purchaseUnit: string;
      }>;

      if (!items || items.length === 0) {
        console.warn(`[Cron] Subscription ${sub.id} has no items, skipping.`);
        continue;
      }

      // Calculate total case count for tier pricing
      const totalCaseCount = items
        .filter((i) => i.purchaseUnit === 'case')
        .reduce((sum, i) => sum + i.quantity, 0);

      // Build Square line items with the subscription discount applied
      const discountMultiplier = 1 - (sub.discount_pct / 100);

      const lineItems = items.map((item) => {
        const product = PRODUCTS.find((p) => p.slug === item.slug);
        if (!product) {
          throw new Error(`Unknown product slug: ${item.slug}`);
        }

        let basePrice: number;
        if (item.purchaseUnit === 'case' && product.casePrice != null) {
          basePrice = getCasePriceForQuantity(product, totalCaseCount);
        } else if (item.purchaseUnit === 'box' && product.boxPrice != null) {
          basePrice = product.boxPrice;
        } else {
          basePrice = product.price;
        }

        const discountedPrice = Math.round(basePrice * discountMultiplier * 100) / 100;
        const unitLabel = item.purchaseUnit === 'case' ? ' (Case of 10)' : ' (Box)';

        return {
          name: `${item.name}${unitLabel} — Subscribe & Save`,
          quantity: String(item.quantity),
          basePriceMoney: {
            amount: BigInt(Math.round(discountedPrice * 100)),
            currency: 'USD' as const,
          },
          note: `Subscription renewal — ${Math.round(sub.discount_pct)}% off`,
        };
      });

      // Create a Square payment link for this renewal
      const origin = 'https://valuesuppliers.co';
      const response = await squareClient.checkout.paymentLinks.create({
        idempotencyKey: randomUUID(),
        order: {
          locationId: SQUARE_LOCATION_ID,
          lineItems,
          metadata: {
            autoship: 'true',
            subscription_id: sub.id,
            source: 'valuesuppliers.co',
            renewal: 'true',
          },
        },
        checkoutOptions: {
          merchantSupportEmail: 'orders@valuesuppliers.co',
          allowTipping: false,
          redirectUrl: `${origin}/checkout/success?renewal=true`,
          askForShippingAddress: true,
        },
      });

      const paymentLink = response.paymentLink;
      if (!paymentLink?.url) {
        throw new Error('Square did not return a payment link.');
      }

      // Email the customer with the payment link
      await sendRenewalReminderEmail(sub.email, {
        subscriptionId: sub.id,
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          purchaseUnit: i.purchaseUnit,
        })),
        frequency: sub.frequency,
        discountPct: sub.discount_pct,
        checkoutUrl: paymentLink.url,
      });

      // Advance next_renewal_at based on frequency
      const nextRenewal = computeNextRenewal(sub.frequency as SubscriptionFrequency);

      await supabase
        .from('subscriptions')
        .update({
          next_renewal_at: nextRenewal.toISOString(),
          last_renewed_at: now,
          square_order_id: paymentLink.orderId ?? null,
        })
        .eq('id', sub.id);

      processed++;
      console.log(`[Cron] Processed subscription ${sub.id} for ${sub.email}`);
    } catch (err) {
      errors++;
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error(`[Cron] Failed to process subscription ${sub.id}:`, msg);
    }
  }

  return NextResponse.json({
    processed,
    errors,
    total: dueSubs.length,
    message: `Processed ${processed} of ${dueSubs.length} subscriptions.`,
  });
}
