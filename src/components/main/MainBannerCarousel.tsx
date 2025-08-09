'use client';
import { mainBannerList } from '@/assets/mocks/mainBannerList';
import { RiArrowRightLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../common/Button';

export default function MainBannerCarousel() {
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
      <div className="overflow-hidden">
        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Navigation, Autoplay]}
          spaceBetween={8}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 슬라이드 설정
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {mainBannerList.map((banner, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/games/${banner.gameId}`}
                className="relative block aspect-square w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={banner.src}
                  alt={banner.title}
                  width={768}
                  height={360}
                  className="absolute inset-0 h-full w-full object-cover"
                  priority={index === 0}
                />
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent px-6 py-8">
                  <h3 className="line-clamp-2 text-2xl font-bold text-white">
                    {banner.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm text-gray-200">
                    {banner.description}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-between px-6 xl:w-[calc(50%+100px)]">
            <div
              className="swiper-button-next after:text-2xl!"
              style={{ color: 'white' }}
            ></div>
            <div
              className="swiper-button-prev after:text-2xl!"
              style={{ color: 'white' }}
            ></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
