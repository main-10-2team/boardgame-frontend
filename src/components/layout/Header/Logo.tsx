'use client';

import LogoIcon from '@/assets/icons/logo.svg';
import Icon from '@/components/common/Icon';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="cursor-pointer text-2xl font-extrabold">
      <Link href="/">
        <div className="flex items-center">
          <Icon icon={LogoIcon} size={24} className="mr-2" />
          보드큐
        </div>
      </Link>
    </div>
  );
}
