import { cn } from '@/utils/cn';

interface GameListSkeletonProps {
  columnNumber?: number;
  imageRatio?: '1:1' | '4:5' | '2:3';
  count?: number;
}

const ratioClasses = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '2:3': 'aspect-[2/3]',
};

export default function GameListSkeleton({
  columnNumber = 3,
  imageRatio = '4:5',
  count = 6,
}: GameListSkeletonProps) {
  return (
    <div
      className={cn(
        `grid grid-cols-2 gap-6`,
        columnNumber === 3 && 'lg:grid-cols-3',
        columnNumber === 4 && 'lg:grid-cols-4',
        columnNumber === 5 && 'lg:grid-cols-5',
        columnNumber === 6 && 'lg:grid-cols-6'
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 overflow-hidden rounded-xl">
          {/* 이미지 영역 */}
          <div
            className={cn(
              'relative w-full animate-pulse overflow-hidden rounded-xl bg-gray-200',
              ratioClasses[imageRatio]
            )}
          />

          {/* 텍스트 영역 */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-4">
              <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-5 w-12 animate-pulse rounded-full bg-gray-200" />
              <div className="h-5 w-12 animate-pulse rounded-full bg-gray-200" />
              <div className="h-5 w-12 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
