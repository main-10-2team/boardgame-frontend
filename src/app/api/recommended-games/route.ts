import { cookies } from 'next/headers';
import { fetcher } from '@/lib/fetcher';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const jar = await cookies();
    const accessToken = jar.get('access_token')?.value;

    if (!accessToken) {
      return NextResponse.json(null);
    }

    const data = await fetcher('/recommendations', {}, accessToken);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(null);
  }
}
