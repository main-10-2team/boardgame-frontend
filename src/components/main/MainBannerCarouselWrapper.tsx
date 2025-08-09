'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import MainBannerSkeleton from './MainBannerSkeleton';

const MainBannerCarousel = dynamic(() => import('./MainBannerCarousel'), {
  ssr: false,
});

export default function MainBannerCarouselWrapper() {
  return (
    <Suspense fallback={<MainBannerSkeleton />}>
      <MainBannerCarousel />
    </Suspense>
  );
}
