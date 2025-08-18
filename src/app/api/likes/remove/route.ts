import { getAccessToken } from '@/lib/getAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = await getAccessToken();
  console.log('token : ', token);
  const { game_id } = await req.json();

  const res = await fetch(`https://boardq.o-r.kr/api/v1/likes/remove/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
