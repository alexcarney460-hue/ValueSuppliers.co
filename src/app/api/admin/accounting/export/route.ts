import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase)
    return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status') || '';

    let query = supabase
      .from('orders')
      .select('id, email, status, total, items, shipping_address, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);

    const { data: orders, error } = await query;
    if (error) throw error;

    const rows = orders ?? [];

    const headers = ['Order ID', 'Email', 'Status', 'Total', 'Items', 'Shipping Address', 'Created At', 'Updated At'];
    const csvLines = [headers.join(',')];

    for (const row of rows) {
      const itemsSummary = Array.isArray(row.items)
        ? row.items.map((i: Record<string, unknown>) => `${i.name || i.product_name || 'Item'} x${i.quantity || i.qty || 1}`).join('; ')
        : '';
      const address = typeof row.shipping_address === 'object' && row.shipping_address
        ? Object.values(row.shipping_address).filter(Boolean).join(' ')
        : String(row.shipping_address || '');

      csvLines.push([
        row.id,
        `"${(row.email || '').replace(/"/g, '""')}"`,
        row.status,
        row.total,
        `"${itemsSummary.replace(/"/g, '""')}"`,
        `"${address.replace(/"/g, '""')}"`,
        row.created_at,
        row.updated_at,
      ].join(','));
    }

    const csv = csvLines.join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="orders-export-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
