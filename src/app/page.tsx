import GameThemeCuration from '@/components/main/GameThemeCuration';
import MainBannerCarouselWrapper from '@/components/main/MainBannerCarouselWrapper';
import NewAndHotGameSection from '@/components/main/NewAndHotGameSection';
import RecommendedGameSection from '@/components/main/RecommendedGameSection';
import TrendingReviewSection from '@/components/main/TrendingReviewSection';

export default function Home() {
  return (
    <>
      <MainBannerCarouselWrapper />
      <div className="space-y-30">
        <GameThemeCuration />
        <RecommendedGameSection />
        <NewAndHotGameSection />
        <TrendingReviewSection />
      </div>
    </>
  );
}
