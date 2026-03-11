import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { squareClient, SQUARE_LOCATION_ID } from '@/lib/square';
import { calculateShipping } from '@/lib/shipping';
import type { CartItem } from '@/context/CartContext';

export async function POST(req: NextRequest) {
  try {
    if (!squareClient) {
      return NextResponse.json({
        error: 'Square is not configured.',
        envCheck: {
          hasToken: !!process.env.SQUARE_ACCESS_TOKEN,
          tokenLength: process.env.SQUARE_ACCESS_TOKEN?.trim().length ?? 0,
          tokenPrefix: process.env.SQUARE_ACCESS_TOKEN?.trim().substring(0, 4) ?? '',
          environment: process.env.SQUARE_ENVIRONMENT ?? 'NOT SET',
          hasLocation: !!process.env.SQUARE_LOCATION_ID,
        },
      }, { status: 500 });
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

    // Calculate and add shipping
    const shipping = calculateShipping(
      items.map((i) => ({ slug: i.id, quantity: i.quantity, price: i.price }))
    );

    lineItems.push({
      name: `Shipping — ${shipping.tierLabel}`,
      quantity: '1',
      basePriceMoney: {
        amount: BigInt(Math.round(shipping.shippingCost * 100)),
        currency: 'USD' as const,
      },
      note: `${shipping.totalWeight} lbs total weight`,
    });

    // Create Square payment link (new SDK: squareClient.checkout.paymentLinks.create)
    const response = await squareClient.checkout.paymentLinks.create({
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
    });

    const paymentLink = response.paymentLink;
    if (!paymentLink?.url) {
      throw new Error('Square did not return a payment link URL.');
    }

    return NextResponse.json({ url: paymentLink.url, id: paymentLink.id });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    const errBody = (err as Record<string, unknown>)?.body ?? '';
    const errStatus = (err as Record<string, unknown>)?.statusCode ?? '';
    console.error('[Square] checkout error:', errMsg, errBody, errStatus);
    return NextResponse.json({
      error: 'Unable to start checkout.',
      debug: {
        message: errMsg,
        body: errBody,
        statusCode: errStatus,
        envCheck: {
          hasToken: !!process.env.SQUARE_ACCESS_TOKEN,
          tokenLength: process.env.SQUARE_ACCESS_TOKEN?.trim().length ?? 0,
          tokenPrefix: process.env.SQUARE_ACCESS_TOKEN?.trim().substring(0, 4) ?? '',
          environment: process.env.SQUARE_ENVIRONMENT ?? 'NOT SET',
          locationId: process.env.SQUARE_LOCATION_ID ?? 'NOT SET',
        },
      },
    }, { status: 500 });
  }
}
