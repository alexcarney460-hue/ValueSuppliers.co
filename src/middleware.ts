import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware: protects /admin routes and /api/admin routes.
 *
 * Authentication scheme:
 *   - Admin pages require an `admin_token` cookie that matches ADMIN_ANALYTICS_TOKEN env.
 *   - Admin API routes already check Bearer tokens per-route via requireAdmin(),
 *     but this middleware adds an extra layer: requests without a valid cookie
 *     OR valid Bearer header are rejected early.
 *   - Public routes pass through untouched.
 *
 * To authenticate, visit /admin?token=<ADMIN_ANALYTICS_TOKEN> — the middleware
 * sets a secure HttpOnly cookie and redirects to /admin.
 */

const ADMIN_PATHS = ['/admin', '/api/admin'];

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only gate admin paths
  if (!isAdminPath(pathname)) {
    return NextResponse.next();
  }

  const expectedToken = process.env.ADMIN_ANALYTICS_TOKEN;

  // If env is not set, block all admin access
  if (!expectedToken) {
    return new NextResponse('Service unavailable', { status: 503 });
  }

  // Allow login via query param: /admin?token=xxx
  // Sets a cookie and redirects to clean URL
  const loginToken = searchParams.get('token');
  if (loginToken && timingSafeCompare(loginToken, expectedToken)) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('token');
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set('admin_token', expectedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  // Check cookie auth
  const cookieToken = request.cookies.get('admin_token')?.value;
  if (cookieToken && timingSafeCompare(cookieToken, expectedToken)) {
    return NextResponse.next();
  }

  // For API routes, also accept Bearer header (already checked per-route,
  // but this lets API calls through middleware without a cookie)
  if (pathname.startsWith('/api/admin')) {
    const authHeader = request.headers.get('authorization') || '';
    const bearerToken = authHeader.replace(/^Bearer\s+/i, '');
    if (bearerToken && timingSafeCompare(bearerToken, expectedToken)) {
      return NextResponse.next();
    }
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // Admin page without valid cookie — return 401
  return new NextResponse(
    '<html><body style="font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f5f5f5">' +
    '<div style="text-align:center"><h1 style="font-size:1.5rem;color:#333">Admin Access Required</h1>' +
    '<p style="color:#666">Append <code>?token=YOUR_TOKEN</code> to authenticate.</p></div></body></html>',
    {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    },
  );
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
