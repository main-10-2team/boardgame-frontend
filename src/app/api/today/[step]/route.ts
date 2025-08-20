import { getAccessToken } from '@/lib/getAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: { step: string } }
) {
  const { step } = await context.params;
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(
    `https://boardq.o-r.kr/api/v1/today/game/questions/${step}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
