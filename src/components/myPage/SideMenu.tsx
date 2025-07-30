'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MY_PAGE_MENUS = [
  { label: '내 정보', href: '/mypage/profile' },
  { label: '내 리뷰', href: '/mypage/reviews' },
  { label: '좋아요', href: '/mypage/likes' },
];

function PcSideMenu() {
  const pathname = usePathname();
  return (
    <>
      {MY_PAGE_MENUS.map(({ label, href }) => {
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              pathname === href
                ? 'text-primary-500 font-semibold'
                : 'hover:text-primary-400 text-gray-700 transition-colors duration-300'
            )}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

function MobileSideMenu() {
  const pathname = usePathname();
  return (
    <>
      {MY_PAGE_MENUS.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm transition-colors duration-300',
              isActive
                ? 'bg-primary-400 text-white'
                : 'hover:text-primary-400 bg-gray-50 text-black'
            )}
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
    <div>
      <aside className="hidden w-[160px] shrink-0 text-lg text-black md:block">
        <ul className="mt-3 flex flex-col gap-4 text-lg text-gray-500">
          <PcSideMenu />
        </ul>
      </aside>
      <nav className="flex gap-4 py-3 text-sm font-medium text-gray-600 md:hidden">
        <MobileSideMenu />
      </nav>
    </div>
  );
}
