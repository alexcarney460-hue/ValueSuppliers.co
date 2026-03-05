import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type { CartItem } from '@/context/CartContext';

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 500 });
    }

    const body = await req.json();
    const items: CartItem[] = body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const hasAutoship = items.some((i) => i.plan === 'autoship');
    const hasOneTime  = items.some((i) => i.plan === 'one-time');

    if (hasAutoship && hasOneTime) {
      return NextResponse.json(
        { error: 'One-time and subscription items must be purchased separately.' },
        { status: 400 }
      );
    }

    const mode: 'payment' | 'subscription' = hasAutoship ? 'subscription' : 'payment';

    const lineItems = items.map((item) => {
      const base: {
        price_data: {
          currency: string;
          product_data: { name: string; metadata: Record<string, string> };
          unit_amount: number;
          recurring?: { interval: 'month'; interval_count: number };
        };
        quantity: number;
      } = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            metadata: { productId: item.id, plan: item.plan },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };

      if (item.plan === 'autoship') {
        base.price_data.recurring = { interval: 'month', interval_count: 1 };
      }

      return base;
    });

    const origin = req.headers.get('origin') ?? 'https://valuesuppliers.co';

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: lineItems,
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ['US'] },
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      ...(hasAutoship && {
        subscription_data: {
          metadata: { autoship: 'true', source: 'valuesuppliers.co' },
        },
      }),
      metadata: {
        autoship: hasAutoship ? 'true' : 'false',
        source: 'valuesuppliers.co',
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('[Stripe] checkout error', err);
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 });
  }
}
