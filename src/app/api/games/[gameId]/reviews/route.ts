import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://boardq.o-r.kr/api/v1';

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
