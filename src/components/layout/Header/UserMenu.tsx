import Button from '@/components/common/Button';
import { User } from '@/types/user/user';
import Image from 'next/image';
import Link from 'next/link';

export function UserMenu({ user }: { user: User }) {
  return (
    <div className="flex shrink-0 items-center gap-8 text-sm font-semibold">
      <Link href={'/my-page'} className="flex items-center gap-2">
        <Image
          src={
            user.profile_image
              ? `https://boardq.o-r.kr/media/${user.profile_image}`
              : '/images/defaultProfileImg.png'
          }
          alt="프로필"
          width={32}
          height={32}
          priority
          className="rounded-full"
        />
        <span>{user.nickname}</span>
      </Link>
      <form action="/logout" method="post">
        <Button variant="primary">로그아웃</Button>
      </form>
    </div>
  );
}
