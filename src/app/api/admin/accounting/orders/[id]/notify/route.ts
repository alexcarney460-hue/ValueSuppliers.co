import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';
import {
  sendOrderShippedEmail,
  type OrderData,
  type OrderItem,
} from '@/lib/email';

/**
 * POST /api/admin/accounting/orders/[id]/notify
 *
 * Sends a shipping confirmation email to the customer and updates
 * the order status to 'shipped' with shipped_at timestamp.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });
  }

  const { id } = await params;

  try {
    // Fetch order with items
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
    }

    if (!order.email) {
      return NextResponse.json(
        { ok: false, error: 'Order has no customer email address' },
        { status: 422 },
      );
    }

    if (!order.tracking_number) {
      return NextResponse.json(
        { ok: false, error: 'Order has no tracking number. Add tracking info first.' },
        { status: 422 },
      );
    }

    // Build email data
    const emailOrderData: OrderData = {
      id: order.id,
      email: order.email,
      total: order.total,
      currency: order.currency || 'USD',
      items: (order.order_items || []) as OrderItem[],
      shipping_name: order.shipping_name,
      shipping_address_line1: order.shipping_address_line1,
      shipping_address_line2: order.shipping_address_line2,
      shipping_city: order.shipping_city,
      shipping_state: order.shipping_state,
      shipping_zip: order.shipping_zip,
      shipping_country: order.shipping_country,
      notes: order.notes,
      created_at: order.created_at,
    };

    const trackingData = {
      tracking_number: order.tracking_number,
      shipping_carrier: order.shipping_carrier || 'Unknown',
      tracking_url: order.tracking_url || '',
      shipping_service: order.shipping_service || null,
    };

    // Send the email
    const result = await sendOrderShippedEmail(order.email, emailOrderData, trackingData);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.error || 'Failed to send shipping notification' },
        { status: 500 },
      );
    }

    // Update order status to shipped if not already
    if (order.status !== 'shipped' && order.status !== 'delivered') {
      const { error: updateErr } = await supabase
        .from('orders')
        .update({ status: 'shipped', shipped_at: new Date().toISOString() })
        .eq('id', id);

      if (updateErr) {
        console.error('[notify] Failed to update order status after email sent:', updateErr.message);
        return NextResponse.json({
          ok: true,
          message: 'Email sent but order status could not be updated. Please update manually.',
          warning: updateErr.message,
        });
      }
    }

    return NextResponse.json({ ok: true, message: 'Shipping confirmation email sent' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
