import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { squareClient, SQUARE_LOCATION_ID } from '@/lib/square';
import type { CartItem } from '@/context/CartContext';

export async function POST(req: NextRequest) {
  try {
    if (!squareClient) {
      return NextResponse.json({ error: 'Square is not configured.' }, { status: 500 });
    }
    if (!SQUARE_LOCATION_ID) {
      return NextResponse.json({ error: 'Square location not configured.' }, { status: 500 });
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

    const origin = req.headers.get('origin') ?? 'https://valuesuppliers.co';

    // Build Square order line items
    const lineItems = items.map((item) => ({
      name: item.plan === 'autoship' ? `${item.name} (Subscribe & Save)` : item.name,
      quantity: String(item.quantity),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)),
        currency: 'USD' as const,
      },
      note: item.plan === 'autoship' ? 'Monthly autoship — 10% off' : undefined,
    }));

    // Create Square payment link
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: randomUUID(),
      order: {
        locationId: SQUARE_LOCATION_ID,
        lineItems,
        metadata: {
          autoship: hasAutoship ? 'true' : 'false',
          source: 'valuesuppliers.co',
        },
      },
      checkoutOptions: {
        merchantSupportEmail: 'orders@valuesuppliers.co',
        allowTipping: false,
        redirectUrl: `${origin}/checkout/success`,
        askForShippingAddress: true,
      },
      prePopulatedData: {
        // Square supports pre-populating buyer email if passed in request
      },
    });

    const paymentLink = response.result.paymentLink;
    if (!paymentLink?.url) {
      throw new Error('Square did not return a payment link URL.');
    }

    return NextResponse.json({ url: paymentLink.url, id: paymentLink.id });
  } catch (err) {
    console.error('[Square] checkout error', err);
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 });
  }
}
