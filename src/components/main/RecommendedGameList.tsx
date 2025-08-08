'use client';
import { gameListData } from '@/assets/mocks/gameListData';
import GameItem from '@/components/game/GameItem';
import PreferenceSurveyCTA from '@/components/main/PreferenceSurveyCTA';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function RecommendedGameList() {
  const user = {
    id: 1,
    nickname: '김유저',
  } as const; // 예시 유저 데이터, 실제로는 사용자 인증 정보에서 가져와야 함

  if (!user) {
    return (
      <div className="inner">
        <PreferenceSurveyCTA />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="inner">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          <span className="text-primary-400">{user.nickname}님</span>이 좋아하실
          만한 게임
        </h2>
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
            {gameListData.games.map((game, index) => (
              <SwiperSlide key={index}>
                <GameItem game={game} imageRatio="4:5" showLikeButton={true} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-4 lg:w-[calc(100%+120px)] lg:px-0">
            <div className="theme-button-prev">
              <RiArrowLeftLine className="text-2xl" />
            </div>
            <div className="theme-button-next">
              <RiArrowRightLine className="text-2xl" />
            </div>
          </div>
        </div>
        {/* <GameList games={gameListData.games} columnNumber={4} /> */}
      </div>
    </div>
  );
}
