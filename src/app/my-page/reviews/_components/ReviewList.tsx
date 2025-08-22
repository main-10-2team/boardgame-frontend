import ReviewItemCard from '@/app/my-page/reviews/_components/ReviewItemCard';
import { ReviewItem } from '@/types/user/review';

interface ReviewListProps {
  reviews: ReviewItem[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
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
