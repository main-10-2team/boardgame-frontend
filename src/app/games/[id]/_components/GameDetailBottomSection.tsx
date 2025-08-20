import GameDetailInfo from '@/app/games/[id]/_components/GameDetailInfo';
import GameReviewSection from '@/app/games/[id]/_components/GameReviewSection';
import YoutubeVideoSection from '@/app/games/[id]/_components/YoutubeVideoSection';
// import SimilarGameList from '@/components/game/detail/SimilarGameList';
import Grid from '@/components/layout/Grid';
import { GameDetail } from '@/types/game/game';
import { ReviewListResponse } from '@/types/user/review';

interface GameDetailBottomSectionProps {
  game: GameDetail;
  reviews: ReviewListResponse;
}

export default function GameDetailBottomSection({
  game,
  reviews,
}: GameDetailBottomSectionProps) {
  return (
    <Grid>
      <Grid.Item
        span="col-span-8 md:col-span-12 lg:col-span-8"
        className="order-2 space-y-8 lg:order-1"
      >
        <div className="game-detail-section">
          <h2 className="game-detail-title">게임 설명 & 규칙 영상</h2>
          <YoutubeVideoSection gameTitle={game.title} />
        </div>
        <div className="game-detail-section">
          <GameReviewSection
            gameId={game.game_id}
            gameTitle={game.title}
            imageUrl={game.thumbnail_url}
            reviews={reviews}
          />
        </div>
      </Grid.Item>
      <Grid.Item
        span="col-span-8 md:col-span-12 lg:col-span-4"
        className="order-1 space-y-8 lg:order-2"
      >
        <div className="game-detail-section">
          <h2 className="game-detail-title">게임 정보</h2>
          <GameDetailInfo game={game} />
        </div>
        <div className="game-detail-section">
          <h2 className="game-detail-title">비슷한 게임</h2>
          <div className="space-y-6">
            {/* <SimilarGameList genre={game.genre} /> */}
          </div>
        </div>
      </Grid.Item>
    </Grid>
  );
}
