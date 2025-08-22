'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MainBannerSkeleton() {
  return (
    <div className="relative mt-2 mb-16">
      {/* '오늘 뭐할지 찾고있나요?' 고정 배너 */}
      <div className="absolute top-0 z-10 hidden aspect-square overflow-hidden rounded-xl p-8 md:block md:w-[calc(50%_-_4px)] lg:w-[calc(33.3333%_-_5.3333px)] xl:right-[calc(50%+4px)] xl:w-[calc(25%_-_6px)]">
        <div className="absolute inset-0 z-0 h-full w-full animate-pulse rounded-xl bg-gray-200" />
      </div>

      {/* Swiper Skeleton */}
      <div className="overflow-hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={8}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="relative block aspect-square w-full animate-pulse overflow-hidden rounded-xl bg-gray-100">
                <div className="absolute inset-0" />
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/50 to-transparent px-6 py-8">
                  <div className="mb-2 h-6 w-2/3 rounded bg-gray-300"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* 네비게이션 자리 확보 (로딩 중이라 안보이게 처리) */}
          <div className="absolute top-1/2 left-1/2 z-20 hidden w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-6 xl:w-[calc(50%+100px)]">
            <div className="swiper-button-next" style={{ opacity: 0 }} />
            <div className="swiper-button-prev" style={{ opacity: 0 }} />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
