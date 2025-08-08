'use client';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';

export default function RecommendedGameListSkeleton() {
  const skeletonCount = {
    base: 2,
    md: 3,
    lg: 4,
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="inner">
        <div className="mb-8 h-8 w-64 animate-pulse rounded-md bg-gray-100" />{' '}
        {/* 제목 영역 */}
        <div className="relative" id="recommend-skeleton">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: skeletonCount.lg }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[4/5] w-full animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-4 lg:w-[calc(100%+120px)] lg:px-0">
            <div className="theme-button-prev pointer-events-none opacity-50">
              <RiArrowLeftLine className="text-2xl" />
            </div>
            <div className="theme-button-next pointer-events-none opacity-50">
              <RiArrowRightLine className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
