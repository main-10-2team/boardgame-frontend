import { User } from '@/types/user/user';
import Image from 'next/image';

interface ProfileDetailProps {
  user: User;
}

export default function ProfileDetail({ user }: ProfileDetailProps) {
  return (
    <div className="grid grid-cols-[1fr_3fr] items-center gap-y-6 text-sm whitespace-nowrap">
      <span className="self-start text-gray-600">이미지</span>
      <Image
        src={user.profile_image || '/images/defaultProfileImg.png'}
        alt="기본 프로필 이미지"
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
