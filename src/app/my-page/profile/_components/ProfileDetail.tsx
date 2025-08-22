import { ProfileImage } from '@/components/common/ProfileImage';
import { User } from '@/types/user/user';

interface ProfileDetailProps {
  user: User;
}

export const convertToLocalPhone = (phone: string) => {
  if (phone.startsWith('+82')) {
    const local = '0' + phone.slice(3); // +82 → 0
    if (local.length === 11) {
      return local.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    if (local.length === 10) {
      return local.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    }
    return local;
  }
  return phone;
};

export default function ProfileDetail({ user }: ProfileDetailProps) {
  return (
    <div className="grid grid-cols-[1fr_3fr] items-center gap-y-6 text-sm whitespace-nowrap">
      <span className="self-start text-gray-600">이미지</span>
      <div className="relative size-[108px] overflow-hidden rounded-full">
        <ProfileImage
          src={user.profile_image}
          alt="프로필 이미지"
          sizes={'108px'}
          priority
          fill
          className="rounded-full object-cover"
        />
      </div>

      <span className="text-gray-600">닉네임</span>
      <span className="font-medium">{user.nickname}</span>
      <span className="text-gray-600">이메일</span>
      <span className="font-medium">{user.email}</span>
      <span className="text-gray-600">휴대폰 번호</span>
      <span className="flex items-center">
        {convertToLocalPhone(user.phone_number)}
      </span>
    </div>
  );
}
