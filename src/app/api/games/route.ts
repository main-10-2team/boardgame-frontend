import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://boardq.o-r.kr/api/v1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');
    const pageSize = searchParams.get('page_size');
    const categories = searchParams.get('categories');
    const genres = searchParams.get('genres');
    const players = searchParams.get('players');
    const minPlayTime = Number(searchParams.get('playtime_min_minutes'));
    const maxPlayTime = Number(searchParams.get('playtime_max_minutes'));
    const difficulty = searchParams.get('difficulty');
    const age = searchParams.get('age');

    // 외부 API로 요청을 보낼 URL 생성
    const externalApiUrl = new URL(`${API_BASE_URL}/games/`);

    const setIf = (key: string, value?: string | null) => {
      if (value && value !== '0') {
        externalApiUrl.searchParams.set(key, value);
      }
    };

    setIf('keyword', keyword);
    setIf('page', page);
    setIf('page_size', pageSize);
    setIf('categories', categories);
    setIf('genres', genres);
    setIf('players', players);

    if (minPlayTime > 0) {
      externalApiUrl.searchParams.set(
        'playtime_min_minutes',
        String(minPlayTime)
      );
    }
    if (maxPlayTime > 0) {
      externalApiUrl.searchParams.set(
        'playtime_max_minutes',
        String(maxPlayTime)
      );
    }

    setIf('difficulty', difficulty);
    setIf('age', age);

    // 서버 간 통신이므로 CORS 에러 발생하지 않음
    const res = await fetch(externalApiUrl.toString());

    if (!res.ok) {
      const errorInfo = await res.json();
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
