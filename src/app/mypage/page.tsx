import defaultProfileImg from '@/assets/images/defaultProfileImg.png';
import preferenceBannerImg from '@/assets/images/preferenceBannerImg.png';
import Button from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';

const mockUser = {
  name: '홍길동',
  nickname: '보드게임',
  email: 'user@example.com',
  profileImage: '',
  reviewCount: 13,
  likeCount: 24,
  joinDate: '2025년 7월 22일', // 포맷 변환 필요
  preferredGenres: ['전략', '카드'],
  preferredPlaytimes: ['30분 미만', '1시간 이상'],
  popularGenres: ['전략', '파티', '추리'],

  // 프론트에서 가공 필요
  tier: '보드게임 비기너!',
  percentile: 73,
};

type Keyword = {
  label: string;
  weight: 'bold' | 'normal'; // 강조 여부
};

const keywordMap = new Map<string, Keyword>();

mockUser.preferredGenres.forEach((item) =>
  keywordMap.set(item, { label: item, weight: 'normal' })
);
mockUser.preferredPlaytimes.forEach((item) =>
  keywordMap.set(item, { label: item, weight: 'normal' })
);
mockUser.popularGenres.forEach(
  (item) => keywordMap.set(item, { label: item, weight: 'bold' }) // popular이면 bold로 덮어씀
);

const keywordList = Array.from(keywordMap.values());

const page = () => {
  // const isLoggedIn = false; // 추후 실제 로그인 상태로 변경

  // if (!isLoggedIn) {
  //   redirect('/login');
  // }
  return (
    <div className="flex min-h-screen w-full gap-8 px-12 py-10">
      {/* 사이드바 */}
      <aside className="w-[160px] shrink-0 text-lg font-semibold text-black">
        <div className="mb-6 text-2xl font-bold">마이페이지</div>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>내 정보</li>
          <li>내 리뷰</li>
          <li>좋아요</li>
        </ul>
      </aside>

      <main className="flex w-full flex-col gap-6 whitespace-nowrap">
        {/* 프로필 */}
        <section className="flex flex-col gap-10 rounded-xl border border-gray-200 p-6 md:flex-row">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <Image
              src={mockUser.profileImage || defaultProfileImg}
              alt="기본 프로필 이미지"
              priority
              className="size-25 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <p className="text-xl font-medium">{mockUser.nickname}</p>
              <p className="text-sm text-gray-400">{mockUser.email}</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="w-fit font-semibold"
            >
              프로필 수정
            </Button>
          </div>
          <div className="flex-col gap-6 text-sm">
            <h3 className="mb-4 text-2xl font-semibold">내 활동</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">리뷰수</span>
              <span className="font-semibold">{mockUser.reviewCount}</span>

              <span className="text-gray-500">좋아요 수</span>
              <span className="font-semibold">{mockUser.likeCount}</span>

              <span className="text-gray-500">가입일</span>
              <span className="font-semibold">{mockUser.joinDate}</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 md:flex-row">
          <div className="bg-primary-100 flex flex-1 flex-col justify-center rounded-2xl p-6 text-gray-800">
            <span className="text-2xl font-semibold">
              {mockUser.name} 님은
              <span className="text-primary-400 ml-1">
                상위 {mockUser.percentile}%
              </span>
              ,
            </span>
            <span className="mt-2 text-xl font-bold text-black">
              {mockUser.tier}
            </span>
          </div>
          <div className="border-primary-400 flex-1 rounded-2xl border p-6">
            <p className="mb-2 text-2xl font-semibold text-gray-800">
              취향 키워드
            </p>
            <div className="flex flex-wrap gap-2 text-gray-700"></div>
          </div>
        </section>
        <Link href={'/preference'}>
          <section className="border-primary-300 relative flex items-center justify-between overflow-hidden rounded-2xl border bg-gradient-to-r from-[#FFE6FA] via-[#A1DCE4] to-[#D7FFAC] p-6 text-sm text-gray-800">
            <div>
              <p className="mb-1 font-bold">
                보드게임도 <span className="text-pink-600">취향</span>이 있다면
                더 재밌죠?
              </p>
              <p className="text-sm text-gray-700">
                간단한 질문 몇 개로 <br />
                당신만의 플레이 스타일을 찾아드릴게요.
              </p>
            </div>
            <Image
              src={preferenceBannerImg}
              alt="preference Img"
              className="absolute right-0 hidden max-w-[45%] object-contain md:block"
            />
          </section>
        </Link>
      </main>
    </div>
  );
};

export default page;
