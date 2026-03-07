import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const url = new URL(req.url);
  const q = url.searchParams.get('q') || '';
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '25')));
  const offset = (page - 1) * limit;

  let query = supabase
    .from('companies')
    .select('*, contacts(id)', { count: 'exact' });

  if (q) {
    query = query.or(`name.ilike.%${q}%,domain.ilike.%${q}%,city.ilike.%${q}%,industry.ilike.%${q}%`);
  }

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const rows = (data || []).map((c: any) => ({
    ...c,
    contacts_count: Array.isArray(c.contacts) ? c.contacts.length : 0,
    contacts: undefined,
  }));

  return NextResponse.json({ ok: true, data: rows, total: count ?? 0 });
}

export async function POST(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const body = await req.json();
  const { data, error } = await supabase.from('companies').insert(body).select().single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, data }, { status: 201 });
}
