'use client';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import {
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainBannerSkeleton from './MainBannerSkeleton';

interface BannerGame {
  game_id: number;
  title: string;
  thumbnail_url: string;
  genre: string;
  category: string;
}

export default function MainBannerCarousel() {
  const [bannerGames, setBannerGames] = useState<BannerGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/games?page=1&page_size=10')
      .then((res) => res.json())
      .then((data) => {
        setBannerGames(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setBannerGames([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <MainBannerSkeleton />;
  }

  return (
    <div className="relative mt-2 mb-16">
      <div className="absolute top-0 z-10 hidden aspect-square overflow-hidden rounded-xl p-8 md:block md:w-[calc(50%_-_4px)] lg:w-[calc(33.3333%_-_5.3333px)] xl:right-[calc(50%+4px)] xl:w-[calc(25%_-_6px)]">
        <Image
          src="/images/main/img_boardpickbanner.png"
          alt="오늘 뭐할지 찾고있나요? Board Pick 배너"
          width={400}
          height={373}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <Link
          href="/today"
          className="relative z-10 flex h-full flex-col justify-center"
        >
          <Image
            src="/images/main/img_boardpickbanner-title.png"
            alt="Board Pick 배너 타이틀"
            width={261}
            height={88}
            className="max-w-full"
          />
          <p className="my-8 text-sm text-white md:text-base lg:text-lg">
            <span className="text-primary-400 font-semibold">
              인원수, 장르, 난이도
            </span>
            를 고려해
            <br />
            어떤 게임을 할지 딱 정해드릴게요!
          </p>
          <Button className="group hidden w-max items-center gap-2 rounded-full sm:flex">
            지금 추천받기
            <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* 게임 슬라이더 */}
      <div className="overflow-hidden">
        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Navigation, Autoplay]}
          spaceBetween={8}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: '.main-button-next',
            prevEl: '.main-button-prev',
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {bannerGames.map((game, index) => (
            <SwiperSlide key={game.game_id}>
              <Link
                href={`/games/${game.game_id}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={game.thumbnail_url}
                  alt={game.title}
                  width={768}
                  height={360}
                  className="absolute inset-0 h-full w-full object-cover"
                  priority={index === 0}
                />
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent px-6 py-8 transition-all group-hover:h-full group-hover:from-[#00000087] group-hover:to-[#00000087]">
                  <h3 className="line-clamp-2 text-2xl font-bold text-white">
                    {game.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm text-gray-200">
                    {game.genre} · {game.category}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-6 xl:w-[calc(50%+10rem)]">
          <div className="main-button-prev pointer-events-auto cursor-pointer">
            <RiArrowLeftSLine className="h-10 w-10 text-white" />
          </div>
          <div className="main-button-next pointer-events-auto cursor-pointer">
            <RiArrowRightSLine className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
