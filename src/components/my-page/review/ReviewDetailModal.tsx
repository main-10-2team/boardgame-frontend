import Modal from '@/components/common/modal/Modal';
import ReviewDetailView from '@/components/my-page/review/ReviewDetailView';
import ReviewEditForm from '@/components/my-page/review/ReviewEditForm';
import { ReviewItem } from '@/types/user/review';
import { useState } from 'react';

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: ReviewItem;
}

export default function ReviewDetailModal({
  isOpen,
  onClose,
  review,
}: ReviewDetailModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <Modal
      modalId={`review-detail-${review.review_id}`}
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[640px]"
    >
      <h2 className="mb-8 text-xl font-bold">
        {isEditMode ? '리뷰 수정' : '리뷰 상세'}
      </h2>
      {isEditMode ? (
        <ReviewEditForm
          review={review}
          onClose={onClose}
          onSave={() => setIsEditMode(false)}
        />
      ) : (
        <ReviewDetailView
          review={review}
          onClose={onClose}
          onEdit={() => setIsEditMode(true)}
        />
      )}
    </Modal>
  );
}
