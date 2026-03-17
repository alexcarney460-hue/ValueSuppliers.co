import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';

function safeEqual(a: string, b: string): boolean {
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export function requireAdmin(req: Request): NextResponse | null {
  const adminToken = process.env.ADMIN_ANALYTICS_TOKEN;

  if (!adminToken) {
    return NextResponse.json(
      { ok: false, error: 'missing_env' },
      { status: 500 },
    );
  }

  const auth = req.headers.get('authorization') || '';
  const expected = `Bearer ${adminToken}`;
  if (!safeEqual(auth, expected)) {
    return NextResponse.json(
      { ok: false, error: 'unauthorized' },
      { status: 401 },
    );
  }

  return null;
}
