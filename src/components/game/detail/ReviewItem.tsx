import { MyReviewItem, type ReviewItem } from '@/types/user/review';
import { formatDate } from '@/utils/formatDate';
import { RiStarFill } from '@remixicon/react';
import Image from 'next/image';

interface ReviewItemProps {
  review: ReviewItem | MyReviewItem;
  isDisplayImage?: boolean;
  isDisplayTitle?: boolean;
  isDisplayDate?: boolean;
}
export default function ReviewItem({
  review,
  isDisplayImage,
  isDisplayTitle,
  isDisplayDate,
}: ReviewItemProps) {
  if ('user' in review) {
    // 다른 사용자 리뷰
    return (
      <div className="h-50 cursor-pointer space-y-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 transition hover:bg-gray-100">
        <div className="flex items-center justify-between">
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
        <div className="flex">
          {isDisplayImage && (
            <div className="mr-4 aspect-[4/5] h-20 flex-shrink-0 overflow-hidden rounded border-gray-300">
              <Image
                src={review.image_url || '/images/img_default.png'}
                alt={review.title || 'Review Image'}
                width={360}
                height={200}
                className="h-full w-full object-cover"
                priority={true}
              />
            </div>
          )}
          <div>
            {isDisplayTitle && (
              <h5 className="mb-1 text-sm font-semibold text-gray-800">
                {review.title}
              </h5>
            )}
            <p className="mt-2 mb-2 line-clamp-3 text-sm text-gray-700">
              {review.content}
            </p>
            {isDisplayDate && (
              <span className="text-xs text-gray-400">
                {formatDate(review.created_at)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    // 내리뷰
    return (
      <div className="h-full cursor-pointer space-y-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 transition hover:bg-gray-100">
        {isDisplayImage && (
          <Image
            src={review.image_url}
            alt={review.title}
            width={360}
            height={200}
            className="h-40 w-full rounded-lg object-cover"
          />
        )}
        {isDisplayTitle && (
          <h3 className="text-lg font-semibold text-gray-800">
            {review.title}
          </h3>
        )}
        <p className="mt-2 mb-2 line-clamp-3 text-sm text-gray-700">
          {review.content}
        </p>
        <span className="text-xs text-gray-400">
          {formatDate(review.created_at)}
        </span>
      </div>
    );
  }
}
