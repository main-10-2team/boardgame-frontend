import ActivityStats from '@/app/my-page/_components/ActivityStats';
import PreferencesCard from '@/app/my-page/_components/PreferencesCard';
import ProfileCard from '@/app/my-page/_components/ProfileCard';
import SurveyBanner from '@/app/my-page/_components/SurveyBanner';
import Grid from '@/components/layout/Grid';
import MyPageSideMenu from '@/components/my-page/SideMenu';
import { getUser } from '@/lib/auth';

export default async function MyPage() {
  const userProfile = await getUser();

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
          <SurveyBanner />
        </Grid.Item>
      </Grid>
    </main>
  );
}
