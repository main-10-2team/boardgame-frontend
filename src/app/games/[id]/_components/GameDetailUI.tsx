'use client';
import { getGameDataClient } from '@/lib/api/gameDetail';
import { getReviewDataClient } from '@/lib/api/reviews';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import GameDetailBottomSection from './GameDetailBottomSection';
import GameDetailPageHeader from './GameDetailPageHeader';
import GameDetailTopSection from './GameDetailTopSection';

export default function GameDetailUI({ id }: { id: number }) {
  const { data: game, isLoading: isGameLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: () => getGameDataClient(id),
  });
  const { data: reviewData } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getReviewDataClient(id),
  });

  if (isGameLoading) return <div>Loading...</div>;

  if (!isGameLoading && !game) return notFound();

  if (!game) {
    notFound();
  }

  return (
    <div className="inner pt-6 pb-40">
      <GameDetailPageHeader
        title={game.title}
        is_liked={game.is_liked}
        gameId={game.game_id}
      />
      {/* 게임 상세 상단 */}
      <GameDetailTopSection game={game} />

      {/* 게임 상세(하단) */}
      <GameDetailBottomSection game={game} reviews={reviewData} />
    </div>
  );
}
