import { reviewData } from '@/assets/mocks/gameListData';
import Button from '@/components/common/Button';
import ReviewDetailModal from '@/components/my-page/review/ReviewDetailModal';
import { ReviewItem } from '@/types/user/review';
import { useEffect, useState } from 'react';
import ReviewList from './ReviewList';
import ReviewModal from './ReviewModal';

interface GameReviewSectionProps {
  gameId: number;
  gameTitle: string;
  imageUrl: string;
}
export default function GameReviewSection({
  gameId,
  gameTitle,
  imageUrl,
}: GameReviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [modalReview, setModalReview] = useState<ReviewItem>();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const toggleReviewWrite = () => {
    setIsWriteModalOpen((prev) => !prev);
  };
  const handleReviewClick = (review: ReviewItem) => {
    setModalReview(review);
    setIsModalOpen(true);
  };
  useEffect(() => {
    setReviews(reviewData.reviews);
  }, []);

  return (
    <>
      <h2 className="game-detail-title flex items-center justify-between">
        <p className="flex items-center">
          게임 리뷰
          <span className="text-primary-400 ml-4 text-base font-semibold">
            {reviewData.total_reviews ?? 0}
          </span>
        </p>
        <Button size="sm" onClick={toggleReviewWrite}>
          리뷰 쓰기
        </Button>
      </h2>
      {!reviews ? (
        <p className="text-gray-500">아직 작성된 리뷰가 없습니다.</p>
      ) : (
        <ReviewList reviews={reviews} handleModalClick={handleReviewClick} />
      )}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={modalReview}
      />
      <ReviewDetailModal
        isOpen={isWriteModalOpen}
        onClose={toggleReviewWrite}
        isNew={true}
        title={gameTitle}
        image_url={imageUrl}
        game_id={gameId}
      />
    </>
  );
}
