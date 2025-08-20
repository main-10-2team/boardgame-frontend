import { getUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUser();

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error('❌ /api/me error:', err);
    return NextResponse.json(
      { user: null, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
