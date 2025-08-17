'use client';
import { GameListItem } from '@/types/game/game';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import RecommendedGameListSkeleton from './RecommendedGameListSkeleton';
const RecommendedGameList = dynamic(() => import('./RecommendedGameList'), {
  ssr: false,
});

interface RecommendedGameListWrapperProps {
  games: GameListItem[];
}
export default function RecommendedGameListWrapper({
  games,
}: RecommendedGameListWrapperProps) {
  return (
    <Suspense fallback={<RecommendedGameListSkeleton />}>
      <RecommendedGameList games={games} />
    </Suspense>
  );
}
