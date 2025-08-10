import { cn } from '@/utils/cn';

interface ResultCardProps {
  variant?: 'glass' | 'soft';
  align?: 'left' | 'right';
}

export default function ResultCardSkeleton({
  variant = 'glass',
  align = 'left',
}: ResultCardProps) {
  return (
    <div
      className={cn(
        'relative mx-auto grid max-w-2xl grid-cols-1 gap-5 overflow-hidden rounded-2xl border border-white/50 px-6 py-8 md:grid-cols-[220px,1fr]',
        'animate-pulse', // 로딩 효과
        variant === 'glass' ? 'bg-white/1 backdrop-blur-md' : 'bg-white/40',
        align === 'right' ? 'md:grid-cols-[1fr,220px]' : ''
      )}
    >
      {/* glass variant일 때 스켈레톤 배경 효과 */}
      {variant === 'glass' && (
        <div className="absolute inset-0 z-10 bg-gray-200/50 backdrop-blur-md"></div>
      )}

      <div className="relative flex items-end justify-between gap-6">
        {/* 썸네일 스켈레톤 */}
        <div
          className={`relative aspect-[4/5] w-2/5 max-w-60 shrink-0 overflow-hidden rounded-xl bg-gray-300 ${align === 'right' ? 'order-1' : ''}`}
        ></div>

        {/* 텍스트 스켈레톤 */}
        <div
          className={`flex w-full flex-col gap-3 md:gap-6 ${align === 'right' ? '' : 'items-end'}`}
        >
          {/* quote 스켈레톤 */}
          <div
            className={`w-full ${align === 'right' ? '' : 'flex flex-col items-end'}`}
          >
            <div className="h-10 w-11/12 rounded bg-gray-300"></div>
            <div className="mt-2 h-4 w-1/2 rounded bg-gray-300"></div>
          </div>

          {/* 제목 스켈레톤 */}
          <div className="h-8 w-2/3 rounded bg-gray-300"></div>

          {/* 태그 스켈레톤 */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 rounded-full bg-gray-300"></div>
            <div className="h-6 w-20 rounded-full bg-gray-300"></div>
            <div className="h-6 w-20 rounded-full bg-gray-300"></div>
          </div>

          {/* 버튼 스켈레톤 */}
          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* summary 스켈레톤 */}
      <div className="z-99 mt-1 rounded-xl bg-white/40 px-3 py-2 md:px-6 md:py-8">
        <div className="h-4 w-full rounded bg-gray-300"></div>
        <div className="mt-2 h-4 w-11/12 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
