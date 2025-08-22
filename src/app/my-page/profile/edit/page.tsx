import ProfileEditForm from '@/app/my-page/profile/edit/_components/ProfileEditForm';
import { getUser } from '@/lib/auth';

export default async function ProfileEditPage() {
  const userProfile = await getUser();

  return <ProfileEditForm userProfile={userProfile} />;
}
