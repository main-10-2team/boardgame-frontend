import ConfirmModal from '@/components/common/modal/ConfirmModal';
import StarRating from '@/components/common/StarRating';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MyReviewItem } from '@/types/user/review';
import { RiDeleteBinLine, RiPencilLine } from '@remixicon/react';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewDetailViewProps {
  review: MyReviewItem;
  onEdit: () => void;
  onClose: () => void;
}

export default function ReviewDetailView({
  review,
  onEdit,
  onClose,
}: ReviewDetailViewProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');
  // 중첩 모달 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  // 확인 시 알림 함수
  const handleConfirm = () => {
    alert('삭제되었습니다.');
    setIsConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <div className="flex gap-6">
        <div className="flex flex-col justify-center gap-4">
          <Image
            src={review.image_url}
            alt={review.content}
            width={200}
            height={250}
            className="aspect-[4/5] w-40 shrink-0 rounded-md object-cover sm:w-[200px]"
            priority
          />
          <div>
            <StarRating
              value={review.rating}
              readOnly={true}
              size={isMobile ? 32 : 40}
              containerClassName="justify-center"
            />
            <p className="mt-2 text-xs text-gray-500">다음에 또 할래요!</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="font-semibold">{review.title}</h3>
          <p className="text-xs whitespace-pre-line">{review.content}</p>
          <span className="text-[10px] text-gray-400">
            {new Date(review.created_at).toLocaleDateString('ko-KR')}
          </span>
          <div className="flex justify-end gap-2 text-gray-400">
            <button
              className="cursor-pointer"
              onClick={onEdit}
              aria-label="리뷰 수정"
            >
              <RiPencilLine size={16} />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => setIsConfirmOpen(true)}
              aria-label="리뷰 삭제"
            >
              <RiDeleteBinLine size={16} />
            </button>
          </div>
        </div>
        <ConfirmModal
          isOpen={isConfirmOpen}
          modalId="confirmModal"
          title="알림"
          message="리뷰를 삭제하시겠어요?"
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
    </>
  );
}
