import GameThemeCuration from '@/components/main/GameThemeCuration';
import MainBannerCarouselWrapper from '@/components/main/MainBannerCarouselWrapper';

export default function Home() {
  return (
    <>
      <MainBannerCarouselWrapper />
      <div className="space-y-30">
        <GameThemeCuration />
      </div>
    </>
  );
}
