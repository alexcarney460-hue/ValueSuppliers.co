import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';

interface OrderItem {
  name?: string;
  product_name?: string;
  title?: string;
  quantity?: number;
  qty?: number;
  price?: number;
  unit_price?: number;
}

export async function GET(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase)
    return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('items, status')
      .not('status', 'in', '("cancelled","refunded")');

    if (error) throw error;

    const productMap: Record<string, { name: string; units_sold: number; revenue: number }> = {};

    for (const order of orders ?? []) {
      const items: OrderItem[] = Array.isArray(order.items) ? order.items : [];
      for (const item of items) {
        const name = item.name || item.product_name || item.title || 'Unknown Product';
        const qty = item.quantity || item.qty || 1;
        const price = item.price || item.unit_price || 0;

        if (!productMap[name]) {
          productMap[name] = { name, units_sold: 0, revenue: 0 };
        }
        productMap[name].units_sold += qty;
        productMap[name].revenue += qty * price;
      }
    }

    const products = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .map((p) => ({
        ...p,
        revenue: Math.round(p.revenue * 100) / 100,
      }));

    return NextResponse.json({ ok: true, data: products });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
