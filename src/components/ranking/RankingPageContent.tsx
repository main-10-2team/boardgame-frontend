'use client';

import { gameRankingData } from '@/assets/mocks/gameRankingData';
import RankingList from '@/components/ranking/RankingList';
import RankingTab from '@/components/ranking/RankingTab';
import { ValidSort } from '@/types/game/gameRanking';
import dynamic from 'next/dynamic';

const Breadcrumbs = dynamic(() => import('@/components/layout/Breadcrumbs'), {
  ssr: false,
});

interface RankingPageContentProps {
  sort: ValidSort;
}

export default function RankingPageContent({ sort }: RankingPageContentProps) {
  return (
    <main className="inner flex flex-1 flex-col gap-6 pt-6 pb-40 text-center">
      <Breadcrumbs />
      <h1 className="text-4xl font-bold">보드큐 랭킹</h1>
      <RankingTab />
      <RankingList games={gameRankingData} />
    </main>
  );
}
