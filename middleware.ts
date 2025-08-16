import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 쿠키 체크
  const hasAccess = !!req.cookies.get('access_token')?.value;
  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-page/:path*', '/today'],
};
