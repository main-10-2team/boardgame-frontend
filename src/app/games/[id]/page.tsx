import { getGameData } from '@/lib/api/gameDetail';
import { getReviewData } from '@/lib/api/reviews';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import GameDetailUI from './_components/GameDetailUI';

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  // const gameResponse = await getGameData(id);
  // const reviewResponse = await getReviewData(id);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['game', id],
    queryFn: () => getGameData(id),
  });

  await queryClient.prefetchQuery({
    queryKey: ['reviews', id],
    queryFn: () => getReviewData(id),
  });

  // return <GameDetailUI game={gameResponse} reviewData={reviewResponse} />;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameDetailUI id={id} />
    </HydrationBoundary>
  );
}
