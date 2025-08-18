'use client';

import RankingSkeleton from '@/app/ranking/_components/RankingItemSkeleton';
import RankingList from '@/app/ranking/_components/RankingList';
import { GameRankingItem } from '@/types/game/gameRanking';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Breadcrumbs = dynamic(() => import('@/components/layout/Breadcrumbs'), {
  ssr: false,
});
const RankingTab = dynamic(
  () => import('@/app/ranking/_components/RankingTab'),
  {
    ssr: false,
  }
);

interface RankingPageContentProps {
  games: GameRankingItem[];
}

export default function RankingPageContent({ games }: RankingPageContentProps) {
  return (
    <main className="inner flex flex-1 flex-col gap-6 pt-6 pb-40 text-center lg:px-2">
      <Breadcrumbs />
      <h1 className="text-4xl font-bold">보드큐 랭킹</h1>
      <RankingTab />
      <Suspense fallback={<RankingSkeleton />}>
        <RankingList games={games} />
      </Suspense>
    </main>
  );
}
