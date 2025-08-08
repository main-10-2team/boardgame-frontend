'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const RecommendedGameList = dynamic(() => import('./RecommendedGameList'), {
  ssr: false,
});

export default function RecommendedGameListWrapper() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RecommendedGameList />
      </Suspense>
    </div>
  );
}
