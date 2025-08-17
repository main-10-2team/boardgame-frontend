import ActivityStats from '@/app/my-page/_components/ActivityStats';
import PreferencesCard from '@/app/my-page/_components/PreferencesCard';
import ProfileCard from '@/app/my-page/_components/ProfileCard';
import SurveyBanner from '@/app/my-page/_components/SurveyBanner';
import { getUser } from '@/lib/auth';

export default async function MyPage() {
  const userProfile = await getUser();

  return (
    <>
      <section className="flex flex-col gap-10 rounded-xl border border-gray-200 p-6 md:flex-row">
        <ProfileCard userProfile={userProfile} />
        <ActivityStats userProfile={userProfile} />
      </section>
      <section className="flex flex-col gap-6 lg:grid lg:grid-cols-9">
        <PreferencesCard userProfile={userProfile} />
      </section>
      <SurveyBanner />
    </>
  );
}
