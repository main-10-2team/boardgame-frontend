import LikePageContent from '@/app/my-page/likes/_components/LikePageContent';
import NoLikes from '@/app/my-page/likes/_components/NoLikes';
import { LikeListResponse } from '@/types/user/like';
import { cookies } from 'next/headers';

export default async function LikePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const res = await fetch('https://boardq.o-r.kr/api/v1/likes/list/', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) {
      return <NoLikes />;
    }
    return <div>좋아요 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const data: LikeListResponse = await res.json();
  return <LikePageContent data={data} />;
}
