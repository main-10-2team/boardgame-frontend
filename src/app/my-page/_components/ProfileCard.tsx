import Button from '@/components/common/Button';
import { ProfileImage } from '@/components/common/ProfileImage';
import Link from 'next/link';

interface ProfileCardProps {
  userProfile: {
    profile_image?: string | null;
    nickname: string;
    email: string;
  };
}

export default function ProfileCard({ userProfile }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 md:items-start">
      <div className="relative size-[108px] overflow-hidden rounded-full">
        <ProfileImage
          src={userProfile.profile_image}
          alt="프로필 이미지"
          sizes={'108px'}
          priority
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center md:text-left">
        <p className="text-xl font-medium">{userProfile.nickname}</p>
        <p className="text-sm text-gray-400">{userProfile.email}</p>
      </div>
      <Link href="/my-page/profile/edit">
        <Button size="sm" variant="secondary" className="w-fit font-semibold">
          프로필 수정
        </Button>
      </Link>
    </div>
  );
}
