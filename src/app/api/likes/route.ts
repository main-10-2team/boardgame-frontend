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
