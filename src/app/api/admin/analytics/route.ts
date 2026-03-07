import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase)
    return NextResponse.json(
      { ok: false, error: 'DB unavailable' },
      { status: 503 },
    );

  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString();

    // ---------- contacts ----------
    const [
      { count: totalContacts },
      { count: newContactsThisMonth },
    ] = await Promise.all([
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthStart),
    ]);

    // ---------- companies ----------
    const [
      { count: totalCompanies },
      { count: newCompaniesThisMonth },
    ] = await Promise.all([
      supabase.from('companies').select('*', { count: 'exact', head: true }),
      supabase
        .from('companies')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthStart),
    ]);

    // ---------- orders (table may not exist yet) ----------
    let totalOrders = 0;
    let ordersThisMonth = 0;
    let revenueThisMonth = 0;
    let orderStatuses: { status: string; count: number }[] = [];
    let monthlyTrend: { month: string; orders: number; revenue: number }[] = [];

    const { error: orderErr } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    const ordersTableExists = !orderErr;

    if (ordersTableExists) {
      const [
        { count: oc },
        { count: ocMonth },
        { data: revData },
        { data: statusData },
        { data: trendData },
      ] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthStart),
        supabase
          .from('orders')
          .select('total')
          .gte('created_at', monthStart),
        supabase.from('orders').select('status'),
        supabase
          .from('orders')
          .select('created_at, total, status')
          .gte('created_at', sixMonthsAgo)
          .order('created_at', { ascending: true }),
      ]);

      totalOrders = oc ?? 0;
      ordersThisMonth = ocMonth ?? 0;
      revenueThisMonth = (revData ?? []).reduce(
        (sum: number, r: any) => sum + (Number(r.total) || 0),
        0,
      );

      // Group statuses
      const statusMap: Record<string, number> = {};
      for (const row of statusData ?? []) {
        const s = row.status || 'unknown';
        statusMap[s] = (statusMap[s] || 0) + 1;
      }
      orderStatuses = Object.entries(statusMap).map(([status, count]) => ({
        status,
        count,
      }));

      // Monthly trend
      const trendMap: Record<string, { orders: number; revenue: number }> = {};
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        trendMap[key] = { orders: 0, revenue: 0 };
      }
      for (const row of trendData ?? []) {
        const d = new Date(row.created_at);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (trendMap[key]) {
          trendMap[key].orders += 1;
          trendMap[key].revenue += Number(row.total) || 0;
        }
      }
      monthlyTrend = Object.entries(trendMap).map(([month, v]) => ({
        month,
        ...v,
      }));
    } else {
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        monthlyTrend.push({ month: key, orders: 0, revenue: 0 });
      }
    }

    // ---------- top sources (contacts.source) ----------
    const { data: sourceRows } = await supabase
      .from('contacts')
      .select('source');
    const sourceMap: Record<string, number> = {};
    for (const row of sourceRows ?? []) {
      const s = row.source || 'Unknown';
      sourceMap[s] = (sourceMap[s] || 0) + 1;
    }
    const sources = Object.entries(sourceMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // ---------- top industries ----------
    // Try the industry column first; fall back to source on companies
    const { data: industryRows } = await supabase
      .from('companies')
      .select('industry');

    let industries: { industry: string; count: number }[] = [];
    if (industryRows && industryRows.length > 0 && (industryRows[0] as any)?.industry !== undefined) {
      const indMap: Record<string, number> = {};
      for (const row of industryRows) {
        const ind = (row as any).industry || 'Unknown';
        indMap[ind] = (indMap[ind] || 0) + 1;
      }
      industries = Object.entries(indMap)
        .map(([industry, count]) => ({ industry, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    } else {
      // Fallback: group companies by source
      const { data: companyRows } = await supabase
        .from('companies')
        .select('source');
      const indMap: Record<string, number> = {};
      for (const row of companyRows ?? []) {
        const s = row.source || 'Unknown';
        indMap[s] = (indMap[s] || 0) + 1;
      }
      industries = Object.entries(indMap)
        .map(([industry, count]) => ({ industry, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }

    // ---------- recent activity ----------
    const [{ data: recentContacts }, { data: recentOrders }] = await Promise.all([
      supabase
        .from('contacts')
        .select('id, firstname, lastname, email, source, created_at')
        .order('created_at', { ascending: false })
        .limit(10),
      ordersTableExists
        ? supabase
            .from('orders')
            .select('id, total, status, created_at')
            .order('created_at', { ascending: false })
            .limit(10)
        : Promise.resolve({ data: [] as any[] }),
    ]);

    return NextResponse.json({
      ok: true,
      data: {
        totals: {
          totalContacts: totalContacts ?? 0,
          newContactsThisMonth: newContactsThisMonth ?? 0,
          totalCompanies: totalCompanies ?? 0,
          newCompaniesThisMonth: newCompaniesThisMonth ?? 0,
          totalOrders,
          ordersThisMonth,
          revenueThisMonth,
        },
        sources,
        industries,
        order_statuses: orderStatuses,
        monthly_trend: monthlyTrend,
        recent_contacts: recentContacts ?? [],
        recent_orders: recentOrders ?? [],
      },
    });
  } catch (err: any) {
    console.error('[analytics] error', err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'Internal error' },
      { status: 500 },
    );
  }
}
