'use client';
import ReviewModal from '@/components/game/detail/ReviewModal';
import TrendingReviewCarousel from '@/components/main/TrendingReviewCarousel';
import { type ReviewItem as ReviewItemType } from '@/types/user/review';
import { useState } from 'react';
interface TrendingReviewWrapperProps {
  reviews: ReviewItemType[];
}
export default function TrendingReviewWrapper({
  reviews,
}: TrendingReviewWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReview, setModalReview] = useState<ReviewItemType>();

  const handleReviewClick = (review: ReviewItemType) => {
    setModalReview(review);
    setIsModalOpen(true);
  };

  return (
    <>
      <TrendingReviewCarousel
        reviews={reviews}
        handleReviewClick={handleReviewClick}
      />
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={modalReview}
      />
    </>
  );
}
