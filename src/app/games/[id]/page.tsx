import { ApiError, fetcher } from '@/lib/fetcher';
import { GameDetail } from '@/types/game/game';
import { ReviewListResponse } from '@/types/user/review';
import { notFound } from 'next/navigation';
import GameDetailUI from './_components/GameDetailUI';

async function getGameData(id: string) {
  try {
    return await fetcher<GameDetail>(`/games/${id}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }
    throw e;
  }
}

async function getReviewData(id: string) {
  try {
    return await fetcher<ReviewListResponse>(
      `/games/${id}/reviews?limit=10&page=1`
    );
  } catch (e) {
    if (e instanceof ApiError && e.status === 400) {
      const emptyResponse: ReviewListResponse = {
        state: 'failure',
        title: '',
        thumbnail_url: '',
        total_reviews: 0,
        page: 1,
        limit: 10,
        total_pages: 1,
        reviews: [],
      };
      return emptyResponse;
    }
    throw e;
  }
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameResponse = await getGameData(id);
  const reviewResponse = await getReviewData(id);

  return <GameDetailUI game={gameResponse} reviewData={reviewResponse} />;
}
