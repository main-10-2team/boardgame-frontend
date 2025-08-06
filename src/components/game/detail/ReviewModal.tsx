import Modal from '@/components/common/modal/Modal';
import { ReviewItem } from '@/types/user/review';
import { formatDate } from '@/utils/formatDate';
import { RiStarFill } from '@remixicon/react';
import Image from 'next/image';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: ReviewItem | undefined;
}
export default function ReviewModal({
  isOpen,
  onClose,
  review,
}: ReviewModalProps) {
  if (!review) {
    return null; // 리뷰가 없으면 아무것도 렌더링하지 않음
  }
  return (
    <Modal
      modalId={`review-detail-${review.review_id}`}
      isOpen={isOpen}
      onClose={onClose}
      className="mx-6 w-full max-w-150"
    >
      <h2 className="mb-8 text-xl font-bold">리뷰 상세</h2>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={
                review.user.profile_image_url || '/images/defaultProfileImg.png'
              }
              alt={review.user.username}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-gray-800">
              {review.user.username}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <RiStarFill className="h-4 w-4 text-amber-300" />
            <span className="text-gray-900">{review.rating}</span>
          </div>
        </div>
        <div className="flex max-h-120 flex-1 flex-col gap-4 overflow-auto">
          {review.title && <h3 className="font-semibold">{review.title}</h3>}
          <p className="whitespace-pre-line">{review.content}</p>
          <span className="text-sm text-gray-400">
            {formatDate(review.created_at)}
          </span>
        </div>
      </div>
    </Modal>
  );
}
