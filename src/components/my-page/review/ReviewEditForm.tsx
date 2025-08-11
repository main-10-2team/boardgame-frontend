'use client';

import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MyReviewItem, MyReviewWriteItem } from '@/types/user/review';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewEditFormProps {
  review: MyReviewItem | MyReviewWriteItem;
  onSave: () => void; // (updated: ReviewItem)
  onClose: () => void;
  isWriteMode?: boolean;
}

export default function ReviewEditForm({
  review,
  onSave,
}: ReviewEditFormProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');

  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);

  const handleSubmit = () => {
    // const updatedReview: ReviewItem = {
    //   ...review,
    //   rating,
    //   title,
    //   content,
    // };
    // onSave(updatedReview);
    alert('리뷰가 수정되었습니다.');
    onSave();
  };

  return (
    <>
      <div className="flex gap-4">
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
