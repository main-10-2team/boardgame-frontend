'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ORDER_TABS = [
  { label: '전체', href: '/ranking' },
  { label: '좋아요', href: '/ranking/likes' },
  { label: '평점', href: '/ranking/rating' },
  { label: '리뷰 많은 순', href: '/ranking/reviews' },
];

export default function RankingTab() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center gap-2 py-4 text-sm font-medium whitespace-nowrap">
      {ORDER_TABS.map((tab) => {
        const isActive = pathname === tab.href;
        const tabStyle = cn(
          'rounded-full px-4.5 py-2.5 text-sm transition-colors duration-300',
          isActive
            ? 'bg-primary-400 text-white'
            : 'bg-gray-50 text-black hover:text-primary-400'
        );

        return (
          <Link key={tab.href} href={tab.href} className={tabStyle}>
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
