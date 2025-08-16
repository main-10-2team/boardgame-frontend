import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/my-page', '/today'];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const needsAuth = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!needsAuth) return NextResponse.next();

  const hasAccess = !!req.cookies.get('access_token')?.value;
  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    // 돌아갈 경로 보존
    url.searchParams.set('next', pathname + (search || ''));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-page/:path*', '/today'],
};
