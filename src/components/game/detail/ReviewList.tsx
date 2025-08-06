import Button from '@/components/common/Button';
import { ReviewItem } from '@/types/user/review';
import { formatDate } from '@/utils/formatDate';
import { RiAddLine, RiStarFill } from '@remixicon/react';
import Image from 'next/image';

interface ReviewListProps {
  reviews: ReviewItem[];
  handleModalClick: (review: ReviewItem) => void;
}
export default function ReviewList({
  reviews,
  handleModalClick,
}: ReviewListProps) {
  return (
    <>
      <ul className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <li
            key={review.review_id}
            className="cursor-pointer space-y-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 transition hover:bg-gray-100"
            onClick={() => handleModalClick(review)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={review.user.profile_image_url}
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
            <div>
              <p className="mt-2 mb-2 line-clamp-3 text-sm text-gray-700">
                {review.content}
              </p>
              <span className="text-xs text-gray-400">
                {formatDate(review.created_at)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Button variant="secondary" className="align-center group flex">
          더보기
          <RiAddLine className="transition-transform group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </>
  );
}
