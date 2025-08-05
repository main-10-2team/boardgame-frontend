import { ReviewItem } from '@/types/user/review';
import ReviewItemCard from './ReviewItemCard';

interface ReviewListProps {
  reviews: ReviewItem[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0)
    return <p className="text-sm text-gray-500">작성한 리뷰가 없습니다.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {reviews.map((review, index) => (
        <ReviewItemCard
          key={review.review_id}
          review={review}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}
