import ActivityStats from '@/app/my-page/_components/ActivityStats';
import PreferencesCard from '@/app/my-page/_components/PreferencesCard';
import ProfileCard from '@/app/my-page/_components/ProfileCard';
import Grid from '@/components/layout/Grid';
import MyPageSideMenu from '@/components/my-page/SideMenu';
import { getUser } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

const percentile = 73;
const tier = '보드게임 비기너';

export default async function MyPage() {
  const userProfile = await getUser();
  const allKeywords = [...userProfile.popular_genres];

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
          <section className="flex flex-col gap-10 rounded-xl border border-gray-200 p-6 md:flex-row">
            <ProfileCard userProfile={userProfile} />
            <ActivityStats userProfile={userProfile} />
          </section>
          <section className="flex flex-col gap-6 lg:grid lg:grid-cols-9">
            <PreferencesCard userProfile={userProfile} />
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
