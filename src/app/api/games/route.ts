import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://boardq.o-r.kr/api/v1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');
    const pageSize = searchParams.get('page_size');

    // 외부 API로 요청을 보낼 URL 생성
    const externalApiUrl = new URL(`${API_BASE_URL}/games/`);
    if (keyword) externalApiUrl.searchParams.set('keyword', keyword);
    if (page) externalApiUrl.searchParams.set('page', page);
    if (pageSize) externalApiUrl.searchParams.set('page_size', pageSize);

    // 서버 간 통신이므로 CORS 에러 발생하지 않음
    const res = await fetch(externalApiUrl.toString());

    if (!res.ok) {
      const errorInfo = await res.json();
      // 외부 API의 에러를 그대로 클라이언트에 전달
      return NextResponse.json(errorInfo, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
