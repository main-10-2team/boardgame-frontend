// components/common/BreadcrumbsSkeleton.tsx
'use client';

import { Skeleton } from '@/components/common/Skeleton';
import { RiArrowRightSLine } from '@remixicon/react';

export default function BreadcrumbsSkeleton() {
  return (
    <nav className="my-2 text-xs text-gray-500 md:text-sm">
      <ol className="flex items-center">
        {/* 홈 */}
        <li className="flex items-center">
          <Skeleton className="h-3 w-8 md:h-4 md:w-10" />
        </li>

        {/* 화살표 + 1단계 */}
        <li className="flex items-center">
          <RiArrowRightSLine className="mx-1 w-4 text-gray-300" />
          <Skeleton className="h-3 w-12 md:h-4 md:w-16" />
        </li>

        {/* 화살표 + 2단계 (옵션) */}
        <li className="flex items-center">
          <RiArrowRightSLine className="mx-1 w-4 text-gray-300" />
          <Skeleton className="h-3 w-16 md:h-4 md:w-20" />
        </li>
      </ol>
    </nav>
  );
}
