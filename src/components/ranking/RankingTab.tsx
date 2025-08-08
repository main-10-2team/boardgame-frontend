'use client';

import { cn } from '@/utils/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ORDER_TABS = [
  { label: '전체', href: 'popularity' },
  { label: '좋아요', href: 'like' },
  { label: '평점', href: 'rating' },
  { label: '리뷰 많은 순', href: 'review' },
];

export default function RankingTab() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (href: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', href);
    router.push(`${pathname}?${params.toString()}`);
  };

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
          <button
            key={tab.href}
            onClick={() => handleClick(tab.href)}
            className={tabStyle}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
