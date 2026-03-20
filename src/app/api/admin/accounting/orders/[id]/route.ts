import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';

const UPDATABLE_FIELDS = [
  'status',
  'shipping_name',
  'shipping_address_line1',
  'shipping_address_line2',
  'shipping_city',
  'shipping_state',
  'shipping_zip',
  'shipping_country',
  'tracking_number',
  'tracking_url',
  'shipping_carrier',
  'shipping_service',
  'notes',
] as const;

type UpdatableField = typeof UPDATABLE_FIELDS[number];

export async function GET(
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
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
    }

    let contact = null;
    if (order.contact_id) {
      const { data: contactData } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', order.contact_id)
        .single();
      contact = contactData ?? null;
    }

    return NextResponse.json({ ok: true, order, contact });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PATCH(
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

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // Filter to only allowed fields
  const updates: Record<string, unknown> = {};
  for (const field of UPDATABLE_FIELDS) {
    if (field in body) {
      updates[field] = body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: false, error: 'No valid fields to update' }, { status: 400 });
  }

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select('*, order_items(*)')
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, order });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
