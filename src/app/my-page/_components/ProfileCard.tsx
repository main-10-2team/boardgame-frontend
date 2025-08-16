import Button from '@/components/common/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/image';
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
      <ImageWithFallback
        src={
          userProfile.profile_image
            ? `https://boardq.o-r.kr/media/${userProfile.profile_image}`
            : DEFAULT_PROFILE_IMAGE
        }
        alt="프로필 이미지"
        width={108}
        height={108}
        className="rounded-full object-cover"
      />
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
