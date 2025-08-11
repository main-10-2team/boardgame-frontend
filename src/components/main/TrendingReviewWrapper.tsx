'use client';
import { type ReviewItem as ReviewItemType } from '@/types/user/review';
import { useState } from 'react';
import ReviewModal from '../game/detail/ReviewModal';
import TrendingReviewCarousel from './TrendingReviewCarousel';
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
