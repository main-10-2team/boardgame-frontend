'use client';
import Button from '@/components/common/Button';
import ReviewItem from '@/components/game/detail/ReviewItem';
import {
  ReviewListResponse,
  type ReviewItem as ReviewItemType,
} from '@/types/user/review';
import { RiAddLine } from '@remixicon/react';
import { useEffect, useState } from 'react';
interface GameReviewListProps {
  reviews: ReviewListResponse;
  handleModalClick: (review: ReviewItemType) => void;
  gameId: number;
}
export default function GameReviewList({
  reviews: reviewsData,
  handleModalClick,
  gameId,
}: GameReviewListProps) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewItemType[]>(reviewsData.reviews);

  useEffect(() => {
    setReviews(reviewsData.reviews);
  }, [reviewsData]);

  const handleReviewMore = async () => {
    if (reviewsData.total_pages <= page) return;
    const nextPage = page + 1;
    try {
      const more = await fetch(
        `/api/games/${gameId}/reviews?limit=4&page=${nextPage}`
      );
      const reviewData = await more.json();
      setReviews((prev) => [...prev, ...reviewData.reviews]);
    } catch (error) {
      console.error('Error fetching more reviews:', error);
    }
    setPage(nextPage);
  };

  return (
    <>
      {reviewsData.total_reviews > 0 ? (
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
            {reviewsData.total_pages > page ? (
              <Button
                variant="secondary"
                className="align-center group flex"
                onClick={handleReviewMore}
              >
                더보기
                <RiAddLine className="transition-transform group-hover:-translate-y-0.5" />
              </Button>
            ) : null}
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
