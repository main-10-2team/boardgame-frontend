import { API_BASE_URL } from '@/constants/api/url';
import { getAccessToken } from '@/lib/getAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await context.params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';

  try {
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${API_BASE_URL}/games/${gameId}/reviews?limit=${limit}&page=${page}`,
      {
        headers: { Accept: 'application/json' },
        cache: 'no-store', // 클라에서 매번 fresh 데이터 원할 경우
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ gameId: string }> }
) {
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { gameId } = await context.params;

  if (!gameId) {
    return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
  }

  try {
    // 요청 본문 파싱
    const formData = await req.formData();
    const rating = formData.get('rating');
    const content = formData.get('content') ?? '';

    console.log('Posting review:', { gameId, rating, content });

    // upstream API 호출
    const res = await fetch(`${API_BASE_URL}/games/${gameId}/reviews/`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json().catch(() => ({}));

    // 그대로 전달
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Review POST error:', error);
    return NextResponse.json(
      { detail: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
