'use client';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { type ReviewItem as ReviewItemType } from '@/types/user/review';
import ReviewItem from '../game/detail/ReviewItem';
interface TrendingReviewCarouselProps {
  reviews: ReviewItemType[];
  handleReviewClick: (review: ReviewItemType) => void;
}
export default function TrendingReviewCarousel({
  reviews,
  handleReviewClick,
}: TrendingReviewCarouselProps) {
  return (
    <div className="relative h-50 overflow-hidden" id="review">
      <Swiper
        slidesPerView={1}
        direction={'vertical'}
        spaceBetween={24}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 슬라이드 설정
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '#review .theme-button-next',
          prevEl: '#review .theme-button-prev',
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            direction: 'horizontal',
          },
        }}
        className="h-full"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.review_id}
            onClick={() => handleReviewClick(review)}
          >
            <ReviewItem
              review={review}
              isDisplayTitle={true}
              isDisplayImage={true}
              isDisplayDate={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-4 md:flex lg:w-[calc(100%+120px)] lg:px-0">
        <button className="theme-button-prev pointer-events-auto">
          <RiArrowLeftLine className="text-2xl" />
        </button>
        <button className="theme-button-next pointer-events-auto">
          <RiArrowRightLine className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
