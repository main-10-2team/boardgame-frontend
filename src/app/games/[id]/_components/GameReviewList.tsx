'use client';
import Button from '@/components/common/Button';
import ReviewItem from '@/components/game/detail/ReviewItem';
import { fetcher } from '@/lib/fetcher';
import {
  ReviewListResponse,
  type ReviewItem as ReviewItemType,
} from '@/types/user/review';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
interface GameReviewListProps {
  reviews: ReviewItemType[];
  handleModalClick: (review: ReviewItemType) => void;
}
export default function GameReviewList({
  reviews: reviewsData,
  handleModalClick,
}: GameReviewListProps) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewItemType[]>(reviewsData);
  const handleReviewMore = async () => {
    const nextPage = page + 1;
    try {
      const more = await fetcher<ReviewListResponse>(
        `/games/19786/reviews?limit=1&page=${nextPage}`
      );
      setReviews((prev) => [...prev, ...more.reviews]);
    } catch (error) {
      console.error('Error fetching more reviews:', error);
    }
    setPage(nextPage);
  };

  return (
    <>
      {reviews.length > 0 ? (
        <>
          <ul className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <li
                key={review.review_id}
                onClick={() => handleModalClick(review)}
              >
                <ReviewItem review={review} />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              className="align-center group flex"
              onClick={handleReviewMore}
            >
              더보기
              <RiAddLine className="transition-transform group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          아직 작성된 리뷰가 없습니다.
        </p>
      )}
    </>
  );
}
