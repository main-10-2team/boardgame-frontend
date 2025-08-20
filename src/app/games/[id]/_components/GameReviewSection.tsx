'use client';
import Button from '@/components/common/Button';
import ReviewDetailModal from '@/components/my-page/review/ReviewDetailModal';
import { ReviewItem, ReviewListResponse } from '@/types/user/review';
import { User } from '@/types/user/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GameReviewList from './GameReviewList';

interface GameReviewSectionProps {
  gameId: number;
  gameTitle: string;
  imageUrl: string;
  reviews: ReviewListResponse;
}
export default function GameReviewSection({
  gameId,
  gameTitle,
  imageUrl,
  reviews,
}: GameReviewSectionProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReview, setModalReview] = useState<ReviewItem>();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/me')
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        console.log('gamereviewsection', data.user);
      })
      .catch(() => setUser(null));

    console.log('gamereviewsection', user);
  }, []);

  const toggleReviewWrite = () => {
    if (!user) router.push('/auth/login');
    setIsWriteModalOpen((prev) => !prev);
  };
  const handleReviewClick = (review: ReviewItem) => {
    setModalReview(review);
    setIsModalOpen(true);
  };

  return (
    <>
      <h2 className="game-detail-title flex items-center justify-between">
        <p className="flex items-center">
          게임 리뷰
          <span className="text-primary-400 ml-4 text-base font-semibold">
            {reviews.total_reviews ?? 0}
          </span>
        </p>
        <Button size="sm" onClick={toggleReviewWrite}>
          리뷰 쓰기
        </Button>
      </h2>
      <GameReviewList
        gameId={gameId}
        reviews={reviews}
        handleModalClick={handleReviewClick}
      />
      {/* <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={modalReview}
      /> */}
      {modalReview && (
        <ReviewDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          review={modalReview}
          isNew={false}
        />
      )}
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
