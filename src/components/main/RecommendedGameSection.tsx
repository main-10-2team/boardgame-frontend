import { gameListData } from '@/assets/mocks/gameListData';
import { userProfile } from '@/assets/mocks/userProfile';
import PreferenceSurveyCTA from '@/components/main/PreferenceSurveyCTA';
import RecommendedGameListWrapper from '@/components/main/RecommendedGameListWrapper';

export default function RecommendedGameSection() {
  const user = userProfile;

  if (!user) {
    return (
      <div className="inner">
        <PreferenceSurveyCTA />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="inner">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          <span className="text-primary-400">{user.nickname}님</span>이 좋아하실
          만한 게임
        </h2>
        <RecommendedGameListWrapper games={gameListData.games} />
      </div>
    </section>
  );
}
