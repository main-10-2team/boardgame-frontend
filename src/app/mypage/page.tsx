import defaultProfileImg from '@/assets/images/defaultProfileImg.png';
import preferenceBannerImg from '@/assets/images/preferenceBannerImg.png';
import Button from '@/components/common/Button';
import MyPageSideMenu from '@/components/myPage/SideMenu';
import WordCloud from '@/components/wordCloud/WordCloud';
import Image from 'next/image';
import Link from 'next/link';

const mockUser = {
  name: '김유저',
  nickname: '닉유네저임',
  email: 'user@example.com',
  profileImage: '',
  reviewCount: 13,
  likeCount: 24,
  joinDate: '2025-07-22T00:00:00Z',
  preferredGenres: [
    '전략',
    '카드',
    '추리',
    '파티',
    '블러핑',
    '협동',
    '경제',
    '문명',
    '정치',
    '타일 배치',
    '주사위',
    '세트컬렉션',
    '거래',
    '배틀',
    '영역확장',
    '스토리텔링',
  ],
  preferredPlaytimes: ['30분 미만', '1시간 이상'],
  popularGenres: ['전략', '블러핑', '추리'],
  // 이건 백엔드에서 해줘야할듯
  percentile: 73,
  // percentile을 토대로 프론트에서 가공 필요
  tier: '보드게임 비기너!',
};

// 워드클라우드에 들어갈 키워드들
const allKeywords = [
  ...mockUser.preferredGenres,
  ...mockUser.preferredPlaytimes,
  ...mockUser.popularGenres,
];

function formatDateToKorean(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function MyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-8 px-12 py-10 md:flex-row">
      {/* 사이드바 */}
      <div className="flex flex-col">
        <div className="mb-6 text-2xl font-bold">마이페이지</div>
        <MyPageSideMenu />
      </div>
      <main className="flex w-full flex-col gap-6">
        {/* 프로필 */}
        <section className="flex flex-col gap-10 rounded-xl border border-gray-200 p-6 md:flex-row">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <Image
              src={mockUser.profileImage || defaultProfileImg}
              alt="기본 프로필 이미지"
              priority
              className="size-[150px] rounded-full object-cover md:size-[100px]"
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
              <span className="font-semibold">
                {formatDateToKorean(mockUser.joinDate)}
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:flex-row">
          <div className="bg-primary-100 flex flex-1 flex-col justify-center rounded-2xl p-6 text-2xl text-gray-800 lg:min-w-1/2">
            <span className="font-semibold">
              {mockUser.name} 님은
              <span className="text-primary-400 ml-1">
                상위 {mockUser.percentile}%
              </span>
              ,
            </span>
            <span className="mt-2 font-bold text-black">{mockUser.tier}</span>
          </div>
          <div className="border-primary-400 min-w-0 flex-1 rounded-2xl border p-6">
            <p className="mb-2 text-2xl font-semibold text-gray-800">
              취향 키워드
            </p>
            <div className="relative h-[200px] w-full max-w-full overflow-hidden">
              <WordCloud
                keywords={allKeywords}
                popularKeywords={mockUser.popularGenres}
              />
            </div>
          </div>
        </section>
        <Link href={'/preference'}>
          <section className="border-primary-300 relative flex items-center justify-between overflow-hidden rounded-2xl border bg-gradient-to-r from-[#FFE6FA] via-[#A1DCE4] to-[#D7FFAC] p-6 text-sm">
            <div>
              <p className="mb-1 text-lg font-semibold">
                보드게임도 <span className="text-primary-400">취향</span>이
                있다면 더 재밌죠?
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
              priority
            />
          </section>
        </Link>
      </main>
    </div>
  );
}
