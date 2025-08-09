import Button from '@/components/common/Button';
import ReviewItem from '@/components/game/detail/ReviewItem';
import { type ReviewItem as ReviewItemType } from '@/types/user/review';
import { RiAddLine } from '@remixicon/react';
interface ReviewListProps {
  reviews: ReviewItemType[];
  handleModalClick: (review: ReviewItemType) => void;
}
export default function ReviewList({
  reviews,
  handleModalClick,
}: ReviewListProps) {
  return (
    <>
      <ul className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <li key={review.review_id} onClick={() => handleModalClick(review)}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Button variant="secondary" className="align-center group flex">
          더보기
          <RiAddLine className="transition-transform group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </>
  );
}
