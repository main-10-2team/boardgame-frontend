import { ApiError, fetcher } from '@/lib/fetcher';
import { ReviewListResponse } from '@/types/user/review';

export async function getReviewData(id: number) {
  try {
    return await fetcher<ReviewListResponse>(
      `/games/${id}/reviews?limit=4&page=1`
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

export async function getReviewDataClient(id: number) {
  const res = await fetch(`/api/games/${id}/reviews`, {
    method: 'GET',
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
