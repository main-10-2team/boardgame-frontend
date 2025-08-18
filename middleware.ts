import { NextResponse, type NextRequest } from 'next/server';

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    );
    const exp = payload.exp;
    return Date.now() / 1000 > exp;
  } catch (e) {
    return true;
  }
}

export function middleware(req: NextRequest) {
  // 쿠키 체크
  const token = req.cookies.get('access_token')?.value;

  // 쿠키 없거나 토큰 만료 시
  if (!token || isTokenExpired(token)) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-page/:path*', '/today'],
};
