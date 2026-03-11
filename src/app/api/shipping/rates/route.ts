import { NextRequest, NextResponse } from 'next/server';
import { createShipment } from '@/lib/shippo';

/**
 * POST /api/shipping/rates
 * Body: { orderId, addressTo, weightLbs }
 * Returns available carrier rates for the shipment.
 */
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (token !== process.env.ADMIN_ANALYTICS_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { addressTo, weightLbs } = body;

    if (!addressTo?.street1 || !addressTo?.city || !addressTo?.state || !addressTo?.zip) {
      return NextResponse.json({ error: 'Missing shipping address fields' }, { status: 400 });
    }
    if (!weightLbs || weightLbs <= 0) {
      return NextResponse.json({ error: 'Invalid weight' }, { status: 400 });
    }

    const result = await createShipment(addressTo, weightLbs);
    if (!result) {
      return NextResponse.json({ error: 'Shippo is not configured' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      shipmentId: result.shipmentId,
      rates: result.rates,
    });
  } catch (err) {
    console.error('[Shipping] rates error:', err);
    return NextResponse.json({ error: 'Failed to get rates' }, { status: 500 });
  }
}
