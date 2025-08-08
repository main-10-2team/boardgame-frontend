'use client';

import { gameRankingData } from '@/assets/mocks/gameRankingData';
import RankingList from '@/components/ranking/RankingList';
import RankingTab from '@/components/ranking/RankingTab';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Breadcrumbs = dynamic(() => import('@/components/layout/Breadcrumbs'), {
  ssr: false,
});

export default function RankingPageContent() {
  return (
    <main className="inner flex flex-1 flex-col gap-6 pt-6 pb-40 text-center">
      <Breadcrumbs />
      <h1 className="text-4xl font-bold">보드큐 랭킹</h1>
      <Suspense fallback={null}>
        <RankingTab />
      </Suspense>
      <RankingList games={gameRankingData} />
    </main>
  );
}
