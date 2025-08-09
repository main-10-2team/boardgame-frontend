import { reviewData } from '@/assets/mocks/gameListData';
import TrendingReviewWrapper from './TrendingReviewWrapper';

export default function TrendingReviewSection() {
  const reviews = reviewData.reviews;
  return (
    <section className="inner">
      <h2 className="mb-8 text-2xl font-bold md:text-3xl">지금 뜨는 리뷰</h2>
      {reviewData.reviews.length === 0 ? (
        <p className="text-gray-500">아직 작성된 리뷰가 없습니다.</p>
      ) : (
        <TrendingReviewWrapper reviews={reviews} />
      )}
    </section>
  );
}
