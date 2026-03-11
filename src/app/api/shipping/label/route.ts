import { NextRequest, NextResponse } from 'next/server';
import { purchaseLabel } from '@/lib/shippo';
import { getSupabaseServer } from '@/lib/supabase-server';

/**
 * POST /api/shipping/label
 * Body: { orderId, rateId, shipmentId, carrier, servicelevel }
 * Purchases a shipping label and updates the order in Supabase.
 */
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (token !== process.env.ADMIN_ANALYTICS_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, rateId, shipmentId, carrier, servicelevel } = body;

    if (!orderId || !rateId) {
      return NextResponse.json({ error: 'Missing orderId or rateId' }, { status: 400 });
    }

    const label = await purchaseLabel(rateId);
    if (!label) {
      return NextResponse.json({ error: 'Shippo is not configured' }, { status: 500 });
    }

    // Update order with shipping details
    const supabase = getSupabaseServer();
    if (supabase) {
      await supabase.from('orders').update({
        status: 'shipped',
        tracking_number: label.trackingNumber,
        tracking_url: label.trackingUrl,
        label_url: label.labelUrl,
        shippo_shipment_id: shipmentId || null,
        shippo_transaction_id: label.transactionId,
        shipping_carrier: carrier || null,
        shipping_service: servicelevel || null,
        shipped_at: new Date().toISOString(),
      }).eq('id', orderId);
    }

    return NextResponse.json({
      ok: true,
      trackingNumber: label.trackingNumber,
      trackingUrl: label.trackingUrl,
      labelUrl: label.labelUrl,
      eta: label.eta,
    });
  } catch (err) {
    console.error('[Shipping] label purchase error:', err);
    const message = err instanceof Error ? err.message : 'Failed to purchase label';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
