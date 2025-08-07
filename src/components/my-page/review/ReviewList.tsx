import { MyReviewItem } from '@/types/user/review';
import MyReviewItemCard from './MyReviewItemCard';

interface ReviewListProps {
  reviews: MyReviewItem[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0)
    return <p className="text-sm text-gray-500">작성한 리뷰가 없습니다.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {reviews.map((review, index) => (
        <MyReviewItemCard
          key={review.review_id}
          review={review}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}
