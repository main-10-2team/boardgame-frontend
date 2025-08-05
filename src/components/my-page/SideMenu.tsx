'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MY_PAGE_MENUS = [
  { label: '내 정보', href: '/my-page/profile' },
  { label: '내 리뷰', href: '/my-page/reviews' },
  { label: '좋아요', href: '/my-page/likes' },
];

function SideMenu({ isMobile }: { isMobile: boolean }) {
  const pathname = usePathname();

  return (
    <>
      {MY_PAGE_MENUS.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);
        // 공통 스타일
        const common = 'transition-colors duration-300';
        const mobileStyle = cn(
          'rounded-full px-4 py-1.5 text-sm',
          isActive
            ? 'bg-primary-400 text-white'
            : 'bg-gray-50 text-black hover:text-primary-400',
          common
        );
        const pcStyle = cn(
          isActive
            ? 'text-primary-500 font-semibold'
            : 'text-gray-700 hover:text-primary-400',
          common
        );

        return (
          <Link
            key={href}
            href={href}
            className={isMobile ? mobileStyle : pcStyle}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

export default function MyPageSideMenu() {
  return (
    <div className="flex flex-col">
      <Link href={'/my-page'}>
        <div className="mb-6 text-4xl font-bold">마이페이지</div>
      </Link>
      <div>
        <aside className="hidden w-[160px] shrink-0 text-lg text-black md:block">
          <ul className="mt-3 flex flex-col gap-4 text-lg text-gray-500">
            <SideMenu isMobile={false} />
          </ul>
        </aside>
        <nav className="flex gap-4 py-4 text-sm font-medium text-gray-600 md:hidden">
          <SideMenu isMobile />
        </nav>
      </div>
    </div>
  );
}
