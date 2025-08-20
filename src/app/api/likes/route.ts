import { API_BASE_URL } from '@/constants/api/url';
import { getAccessToken } from '@/lib/getAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const pageSize = url.searchParams.get('page_size') || '12';

  const response = await fetch(
    `https://boardq.o-r.kr/api/v1/likes/list/?page=${page}&page_size=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { game_id } = await req.json();
  console.log('test');

  const res = await fetch(`${API_BASE_URL}/likes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ game_id }),
    credentials: 'include', // 세션/쿠키 인증 필요할 경우
  });

  if (!res.ok) {
    throw new Error('Failed to toggle like');
  }

  const data = await res.json(); // 서버 응답 (좋아요 여부 등)
  return NextResponse.json(data);
}
