import { userProfile } from '@/assets/mocks/userProfile';
import Button from '@/components/common/Button';
import Grid from '@/components/layout/Grid';
import MyPageSideMenu from '@/components/myPage/SideMenu';
import WordCloud from '@/components/wordCloud/WordCloud';
import Image from 'next/image';
import Link from 'next/link';

// 워드클라우드에 들어갈 키워드들
const allKeywords = [
  ...userProfile.preferred_genres,
  ...userProfile.preferred_playtimes,
  ...userProfile.popular_genres,
];

const percentile = 73;
const tier = '보드게임 비기너';

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
    <main className="inner flex flex-1 flex-col py-10">
      <Grid>
        {/* 사이드바 */}
        <Grid.Item span="col-span-12 md:col-span-3">
          <MyPageSideMenu />
        </Grid.Item>

        {/* 메인 콘텐츠 */}
        <Grid.Item
          span="col-span-12 md:col-span-9"
          className="flex flex-col gap-6"
        >
          {/* 프로필 */}
          <section className="flex flex-col gap-10 rounded-xl border border-gray-200 p-6 md:flex-row">
            <div className="flex flex-col items-center gap-6 md:items-start">
              <Image
                src={
                  userProfile.profile_image || '/images/defaultProfileImg.png'
                }
                alt="기본 프로필 이미지"
                width={100}
                height={100}
                priority
                className="rounded-full object-cover"
              />
              <div className="text-center md:text-left">
                <p className="text-xl font-medium">{userProfile.nickname}</p>
                <p className="text-sm text-gray-400">{userProfile.email}</p>
              </div>
              <Link href="/mypage/profile/edit">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-fit font-semibold"
                >
                  프로필 수정
                </Button>
              </Link>
            </div>
            <div className="flex-col gap-6 text-sm">
              <h3 className="mb-4 text-2xl font-semibold">내 활동</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">리뷰수</span>
                <span className="font-semibold">
                  {userProfile.review_count}
                </span>

                <span className="text-gray-500">좋아요 수</span>
                <span className="font-semibold">{userProfile.like_count}</span>

                <span className="text-gray-500">가입일</span>
                <span className="font-semibold">
                  {formatDateToKorean(userProfile.created_at)}
                </span>
              </div>
            </div>
          </section>

          {/* 취향 + 퍼센트 */}
          <section className="flex flex-col gap-6 lg:grid lg:grid-cols-9">
            <div className="bg-primary-100 flex flex-1 flex-col justify-center rounded-2xl p-6 text-2xl text-gray-800 lg:col-span-4">
              <span className="font-semibold">
                {userProfile.name} 님은
                <span className="text-primary-400 ml-1">
                  상위 {percentile}%
                </span>
                ,
              </span>
              <span className="mt-2 font-bold text-black">{tier}!</span>
            </div>
            <div className="border-primary-400 min-w-0 flex-1 rounded-2xl border p-6 lg:col-span-5">
              <p className="mb-2 text-2xl font-semibold text-gray-800">
                취향 키워드
              </p>
              <div className="relative h-[200px] w-full max-w-full overflow-hidden">
                <WordCloud
                  keywords={allKeywords}
                  popularKeywords={userProfile.popular_genres}
                />
              </div>
            </div>
          </section>

          {/* 선호도 조사 배너 */}
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
                src="/images/preferenceBannerImg.png"
                alt="preference Img"
                className="absolute right-0 hidden max-w-[45%] object-contain md:block"
                width={309}
                height={253}
                priority
              />
            </section>
          </Link>
        </Grid.Item>
      </Grid>
    </main>
  );
}
