import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;

  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  return NextResponse.json({ ok: true, data });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;
  const body = await req.json();
  body.updated_at = new Date().toISOString();

  const { data, error } = await supabase.from('lists').update(body).eq('id', id).select().single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, data });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;
  const { error } = await supabase.from('lists').delete().eq('id', id);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
