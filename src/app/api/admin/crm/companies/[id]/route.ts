import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;

  const { data: company, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !company) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const [contactsRes, dealsRes, activitiesRes] = await Promise.all([
    supabase.from('contacts').select('*').eq('company_id', id).order('created_at', { ascending: false }),
    supabase.from('deals').select('*').eq('company_id', id).order('created_at', { ascending: false }),
    supabase.from('activities').select('*').eq('company_id', id).order('created_at', { ascending: false }),
  ]);

  return NextResponse.json({
    ok: true,
    data: {
      ...company,
      contacts: contactsRes.data || [],
      deals: dealsRes.data || [],
      activities: activitiesRes.data || [],
    },
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;
  const body = await req.json();
  body.updated_at = new Date().toISOString();

  const { data, error } = await supabase.from('companies').update(body).eq('id', id).select().single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, data });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;
  const { error } = await supabase.from('companies').delete().eq('id', id);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
