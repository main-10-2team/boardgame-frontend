'use client';
import LikeButton from '@/components/game/LikeButton';
import dynamic from 'next/dynamic';

const Breadcrumbs = dynamic(() => import('@/components/layout/Breadcrumbs'), {
  ssr: false,
});

interface GameDetailPageHeaderProps {
  title: string;
  gameId: number;
}

export default function GameDetailPageHeader({
  title,
  gameId,
}: GameDetailPageHeaderProps) {
  return (
    <>
      <Breadcrumbs />
      <h1 className="mt-4 mb-6 flex items-center gap-2 text-2xl font-bold md:mt-6 md:mb-12 md:text-4xl">
        {title}
        <LikeButton
          liked={false}
          gameId={gameId}
          className="relative"
          lineColor="text-gray-300"
        />
      </h1>
    </>
  );
}
