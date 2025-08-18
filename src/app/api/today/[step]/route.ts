import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { step: string } }
) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const step = params.step;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/today/game/questions/${step}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
