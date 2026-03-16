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
    const shipping: { carrier: string; service: string; price: number; estimatedDays: number | null } | undefined = body.shipping;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }
    if (!shipping || typeof shipping.price !== 'number' || shipping.price < 0) {
      return NextResponse.json({ error: 'Please select a shipping option.' }, { status: 400 });
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
    const lineItems = items.map((item) => {
      // Build descriptive name with unit and plan info
      const unitLabel = item.purchaseUnit === 'case'
        ? ' (Case of 10)'
        : item.purchaseUnit === 'box'
          ? ' (Box)'
          : '';
      const planLabel = item.plan === 'autoship' ? ' — Subscribe & Save' : '';
      const itemName = `${item.name}${unitLabel}${planLabel}`;

      const notes: string[] = [];
      if (item.plan === 'autoship') notes.push('Monthly autoship — 10% off');
      if (item.purchaseUnit === 'case') notes.push('1 case = 10 boxes (1000 gloves)');

      return {
        name: itemName,
        quantity: String(item.quantity),
        basePriceMoney: {
          amount: BigInt(Math.round(item.price * 100)),
          currency: 'USD' as const,
        },
        note: notes.length > 0 ? notes.join(' | ') : undefined,
      };
    });

    // Add customer-selected shipping rate as a line item
    const shippingLabel = `Shipping — ${shipping.carrier} ${shipping.service}`;
    lineItems.push({
      name: shippingLabel,
      quantity: '1',
      basePriceMoney: {
        amount: BigInt(Math.round(shipping.price * 100)),
        currency: 'USD' as const,
      },
      note: shipping.estimatedDays
        ? `Est. ${shipping.estimatedDays} business day${shipping.estimatedDays !== 1 ? 's' : ''}`
        : undefined,
    });

    // Create Square payment link
    const response = await squareClient.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: SQUARE_LOCATION_ID,
        lineItems,
        metadata: {
          autoship: hasAutoship ? 'true' : 'false',
          source: 'valuesuppliers.co',
          shipping_carrier: shipping.carrier,
          shipping_service: shipping.service,
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
    const errMsg = err instanceof Error ? err.message : 'unknown error';
    console.error('[Square] checkout error:', errMsg);
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 });
  }
}
