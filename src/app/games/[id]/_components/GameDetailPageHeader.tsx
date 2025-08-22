'use client';
import LikeButton from '@/components/game/LikeButton';
import BreadcrumbsSkeleton from '@/components/layout/BreadcrumbsSkeleton';
import dynamic from 'next/dynamic';

const Breadcrumbs = dynamic(() => import('@/components/layout/Breadcrumbs'), {
  ssr: false,
  loading: () => <BreadcrumbsSkeleton />,
});

interface GameDetailPageHeaderProps {
  title: string;
  is_liked: boolean;
  gameId: number;
}

export default function GameDetailPageHeader({
  title,
  is_liked,
  gameId,
}: GameDetailPageHeaderProps) {
  return (
    <>
      <Breadcrumbs />
      <h1 className="mt-4 mb-6 flex items-center gap-2 text-2xl font-bold md:mt-6 md:mb-12 md:text-4xl">
        {title}
        <LikeButton
          liked={is_liked}
          gameId={gameId}
          className="relative"
          lineColor="text-gray-300"
        />
      </h1>
    </>
  );
}
