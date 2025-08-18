import { rankColorMap } from '@/app/ranking/_components/RankingItem';

export default function RankingSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-6 sm:grid-cols-[auto_1fr_auto_auto]">
      {Array.from({ length: 10 }).map((_, idx) => (
        <RankingItemSkeletonItem key={idx} rank={idx + 1} />
      ))}
    </div>
  );
}

function SkeletonBox({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

function RankingItemSkeletonItem({ rank }: { rank: number }) {
  return (
    <>
      <div className={`py-4 text-5xl ${rankColorMap[rank] || 'text-black'}`}>
        {rank}
      </div>
      <div className="flex items-center gap-4 py-4">
        <SkeletonBox className="h-[125px] w-[100px]" />
        <div className="flex flex-col gap-2">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-3 w-20" />
        </div>
      </div>
      <div className="hidden flex-col items-center gap-y-2.5 text-sm sm:flex">
        <SkeletonBox className="h-4 w-8" />
      </div>
      <div className="hidden flex-col items-center gap-y-2.5 text-sm sm:flex">
        <SkeletonBox className="h-4 w-12" />
      </div>{' '}
    </>
  );
}
