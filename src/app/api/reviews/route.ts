import { API_BASE_URL } from '@/constants/api/url';
import { getAccessToken } from '@/lib/getAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  //   const { review_id } = params;
  const review_id = req.nextUrl.searchParams.get('review_id');

  const token = await getAccessToken();
  console.log(review_id);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const rating = formData.get('rating');
    const content = formData.get('content') ?? '';

    console.log('test', rating, content);
    // 백엔드 요청
    const backendRes = await fetch(
      `${API_BASE_URL}/reviews/${review_id}patch`,
      {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await backendRes.json().catch(() => ({}));

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error('Review PATCH error:', error);
    return NextResponse.json(
      { detail: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const review_id = req.nextUrl.searchParams.get('review_id');
  const token = await getAccessToken();

  if (!review_id) {
    return NextResponse.json(
      { detail: '리뷰 ID가 필요합니다.' },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const backendRes = await fetch(
      `${API_BASE_URL}/reviews/${review_id}delete`,
      {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    return NextResponse.json(
      { detail: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
