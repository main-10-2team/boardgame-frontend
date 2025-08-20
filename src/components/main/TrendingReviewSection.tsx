import { fetcher } from '@/lib/fetcher';
import TrendingReviewWrapper from './TrendingReviewWrapper';
import { type ReviewItem } from '@/types/user/review';

interface ApiReviewPreview {
  game_id: number;
  nickname: string;
  rating: number;
  content: string;
  images: string;
  game_title: string;
  created_at: string;
}

const transformApiReviewToReviewItem = (
  apiReview: ApiReviewPreview,
  index: number
): ReviewItem => ({
  review_id: index + 1,
  game_id: apiReview.game_id,
  title: apiReview.game_title,
  content: apiReview.content,
  rating: apiReview.rating,
  created_at: apiReview.created_at,
  user: {
    user_id: 0,
    username: apiReview.nickname,
    profile_image_url: null,
  },
  image_url: apiReview.images || undefined,
});

export default async function TrendingReviewSection() {
  try {
    const apiReviews = await fetcher<ApiReviewPreview[]>('/reviews/preview/');
    const reviews = apiReviews.map(transformApiReviewToReviewItem);

    return (
      <section className="inner">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">지금 뜨는 리뷰</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">아직 작성된 리뷰가 없습니다.</p>
        ) : (
          <TrendingReviewWrapper reviews={reviews} />
        )}
      </section>
    );
  } catch {
    return (
      <section className="inner">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">지금 뜨는 리뷰</h2>
        <p className="text-gray-500">리뷰를 불러오는데 실패했습니다.</p>
      </section>
    );
  }
}
