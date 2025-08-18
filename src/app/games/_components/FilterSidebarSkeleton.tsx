'use client';

import Button from '@/components/common/Button';
import { Skeleton } from '@/components/common/Skeleton';

export default function FilterSidebarSkeleton() {
  return (
    <aside className="w-full rounded-2xl border border-gray-200 px-4 py-6">
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-5 w-16" /> {/* 필터 제목 */}
        <Skeleton className="h-4 w-10" /> {/* 초기화 */}
      </div>

      <div className="space-y-6">
        {/* 카테고리 */}
        <div>
          <div className="flex cursor-default items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>

        {/* 장르 */}
        <div>
          <div className="flex cursor-default items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>

        {/* 인원수 */}
        <div>
          <div className="mb-4 flex cursor-default items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded" />
            ))}
          </div>
        </div>

        {/* 연령대 */}
        <div>
          <div className="mb-4 flex cursor-default items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>

        {/* 플레이 시간 */}
        <div>
          <Skeleton className="mb-2 h-6 w-24" />
          <Skeleton className="h-3 w-full rounded" /> {/* 슬라이더 */}
        </div>

        {/* 난이도 */}
        <div>
          <Skeleton className="mb-2 h-4 w-16" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded" />
            ))}
          </div>
        </div>

        {/* 검색 버튼 */}
        <Button
          variant="primary"
          size="md"
          disabled
          className="animation-pulse w-full opacity-50"
        >
          검색
        </Button>
      </div>
    </aside>
  );
}
