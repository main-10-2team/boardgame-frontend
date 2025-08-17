'use client';
import { logout } from '@/actions/auth';
import Button from '@/components/common/Button';
import { ProfileImage } from '@/components/common/ProfileImage';
import { User } from '@/types/user/user';
import Link from 'next/link';

export function UserMenu({ user }: { user: User }) {
  return (
    <div className="flex shrink-0 items-center gap-8 text-sm font-semibold">
      <Link href={'/my-page'} className="flex items-center gap-2">
        {/* <ImageWithFallback
          src={
            user.profile_image
              ? `https://boardq.o-r.kr/media/${user.profile_image}`
              : DEFAULT_PROFILE_IMAGE
          }
          alt="프로필"
          width={32}
          height={32}
          priority
          className="rounded-full"
        /> */}
        <div className="relative size-8 overflow-hidden rounded-full">
          <ProfileImage
            src={user.profile_image}
            alt="프로필 이미지"
            sizes={'32px'}
            priority
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span>{user.nickname}</span>
      </Link>
      <form action="/logout" method="post">
        <Button
          variant="primary"
          onClick={async () => {
            await logout();
            window.location.href = '/';
          }}
        >
          로그아웃
        </Button>
      </form>
    </div>
  );
}
