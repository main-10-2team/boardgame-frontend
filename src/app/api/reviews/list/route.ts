import { getAccessToken } from '@/lib/getAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getAccessToken();
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '10';

  const res = await fetch(
    `https://boardq.o-r.kr/api/v1/users/reviews/?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
