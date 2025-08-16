import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/image';
import { User } from '@/types/user/user';

interface ProfileDetailProps {
  user: User;
}

export default function ProfileDetail({ user }: ProfileDetailProps) {
  return (
    <div className="grid grid-cols-[1fr_3fr] items-center gap-y-6 text-sm whitespace-nowrap">
      <span className="self-start text-gray-600">이미지</span>
      <ImageWithFallback
        src={
          user.profile_image
            ? `https://boardq.o-r.kr/media/${user.profile_image}`
            : DEFAULT_PROFILE_IMAGE
        }
        alt="프로필 이미지"
        width={108}
        height={108}
        className="rounded-full object-cover"
      />

      <span className="text-gray-600">닉네임</span>
      <span className="font-medium">{user.nickname}</span>

      <span className="text-gray-600">이메일</span>
      <span className="font-medium">{user.email}</span>
    </div>
  );
}
