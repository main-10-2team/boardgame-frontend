import { API_BASE_URL } from '@/constants/api/url';
import { getAccessToken } from '@/lib/getAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: number } }
) {
  const { gameId } = await params;
  const token = await getAccessToken();

  try {
    const res = await fetch(`${API_BASE_URL}/games/${gameId}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

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
