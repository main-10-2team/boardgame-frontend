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
  console.log('Fetching review data for game:', id);
  const res = await fetch(`/api/games/${id}/reviews`, {
    method: 'GET',
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

// lib/api/review.ts
export async function createReview(
  gameId: number,
  content: string,
  rating: number
) {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('rating', String(rating));

  const response = await fetch(`/api/games/${gameId}/reviews`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    let message = '알 수 없는 오류가 발생했습니다.';
    if (typeof data?.detail === 'string') {
      message = data.detail;
    } else if (data?.detail?.non_field_errors?.length) {
      message = data.detail.non_field_errors[0];
    } else if (data?.detail?.rating?.length) {
      message = data.detail.rating[0];
    }
    throw new Error(message);
  }

  return data;
}

export async function updateReview(
  reviewId: number,
  content: string,
  rating: number
) {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('rating', String(rating));

  const response = await fetch(`/api/reviews?review_id=${reviewId}`, {
    method: 'PATCH',
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    let message = '알 수 없는 오류가 발생했습니다.';
    if (typeof data?.detail === 'string') {
      message = data.detail;
    } else if (data?.detail?.non_field_errors?.length) {
      message = data.detail.non_field_errors[0];
    } else if (data?.detail?.rating?.length) {
      message = data.detail.rating[0];
    }
    throw new Error(message);
  }

  return data;
}
