'use client';
import GameItem from '@/components/game/GameItem';
import { GameData } from '@/types/game/game';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface RecommendedGameListProps {
  games: GameData[];
}
export default function RecommendedGameList({
  games,
}: RecommendedGameListProps) {
  return (
    <div className="relative" id="recommend">
      <Swiper
        slidesPerView={2}
        loop={true}
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 슬라이드 설정
        navigation={{
          nextEl: '#recommend .theme-button-next',
          prevEl: '#recommend .theme-button-prev',
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <GameItem game={game} imageRatio="4:5" showLikeButton={true} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-4 lg:w-[calc(100%+120px)] lg:px-0">
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
