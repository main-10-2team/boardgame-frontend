import ReviewDetailModal from '@/components/my-page/review/ReviewDetailModal';
import { ReviewItem } from '@/types/user/review';
import { RiStarFill } from '@remixicon/react';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewItemCardProps {
  review: ReviewItem;
  isFirst?: boolean;
}

export default function ReviewItemCard({
  review,
  isFirst = false,
}: ReviewItemCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border border-gray-200 p-4 shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={review.image_url}
          alt={review.content}
          width={80}
          height={120}
          className="aspect-2/3 rounded-lg object-cover"
          priority={isFirst}
        />
        <div className="flex flex-1 flex-col gap-2 text-xs">
          <div className="flex justify-between">
            <p className="font-bold">{review.title}</p>
            <div className="flex items-center gap-1">
              <RiStarFill className="h-4 w-4" color="#ffe837" />
              <span>{review.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="line-clamp-6 text-left">{review.content}</p>
        </div>
      </button>
      <ReviewDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        review={review}
      />
    </>
  );
}
