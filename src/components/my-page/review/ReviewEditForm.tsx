'use client';

import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MyReviewWriteItem, ReviewItem } from '@/types/user/review';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewEditFormProps {
  review: ReviewItem | MyReviewWriteItem;
  onSave: () => void; // (updated: ReviewItem)
  onClose: () => void;
  isWriteMode?: boolean;
}

export default function ReviewEditForm({
  review,
  onSave,
  onClose,
  isWriteMode,
}: ReviewEditFormProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');

  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);

  const handleSubmit = async () => {
    console.log('handleSubmit 실행됨');

    const formData = new FormData();
    formData.append('content', content);
    formData.append('rating', String(rating));
    if (review.review_id === -1) {
      // 신규 작성

      const response = await fetch(`/api/games/${review.game_id}/reviews`, {
        method: 'POST',
        body: formData,
      });

      console.log('status', response.status);

      const data = await response.json().catch(() => null);
      console.log('status', response.status, 'response', data);

      if (!response.ok) {
        let message = '알 수 없는 오류가 발생했습니다.';
        if (typeof data?.detail === 'string') {
          message = data.detail; // case 1: "리뷰를 찾을 수 없습니다."
        } else if (data?.detail?.non_field_errors?.length) {
          message = data.detail.non_field_errors[0]; // case 2
        } else if (data?.detail?.rating?.length) {
          message = data.detail.rating[0]; // case 3: validation 메시지
        }
        alert(message);
        onClose();
        return;
      }
      onClose();
      console.log('리뷰 작성 성공');
    } else {
      // 기존 리뷰 수정
      const res = await fetch(`/api/reviews?review_id=${review.review_id}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await res.json().catch(() => null);
      console.log('status', res.status, 'response', data);

      if (!res.ok) {
        let message = '알 수 없는 오류가 발생했습니다.';
        if (typeof data?.detail === 'string') {
          message = data.detail; // case 1: "리뷰를 찾을 수 없습니다."
        } else if (data?.detail?.non_field_errors?.length) {
          message = data.detail.non_field_errors[0]; // case 2
        } else if (data?.detail?.rating?.length) {
          message = data.detail.rating[0]; // case 3: validation 메시지
        }
        alert(message);
        onClose();
        return;
      }
    }

    onSave(); // 저장 후 부모 모드 변경 (edit → view or write → view)
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col justify-center gap-4">
          <Image
            src={review.image_url || '/images/img_default.png'}
            alt={review.content}
            width={200}
            height={250}
            className="aspect-[4/5] w-40 shrink-0 rounded-md object-cover sm:w-[200px]"
            priority
          />
          <div>
            <StarRating
              value={rating}
              onChange={setRating}
              readOnly={false}
              size={isMobile ? 32 : 40}
              containerClassName="justify-center"
            />
            <p className="mt-2 text-xs text-gray-500">다음에 또 할래요!</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h3 className="px-2 font-semibold">{review.title}</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="focus:outline-primary-400 h-full resize-none rounded p-2 text-xs"
            placeholder="이 게임에 대한 생각을 자유롭게 작성해주세요."
          />
        </div>
      </div>
      <Button onClick={handleSubmit} className="mt-10 w-full">
        저장
      </Button>
    </>
  );
}
