import GameThumbnailSection from '@/components/game/detail/GameThumbnailSection';
import GameTags from '@/components/game/GameTags';
import Grid from '@/components/layout/Grid';
import { GameDetail } from '@/types/game/game';

interface GameDetailTopSectionProps {
  game: GameDetail;
}

export default function GameDetailTopSection({
  game,
}: GameDetailTopSectionProps) {
  return (
    <Grid className="mb-8 space-y-8 md:space-y-0 lg:mb-20">
      <Grid.Item span="col-span-8 md:col-span-4 lg:col-span-4">
        <GameThumbnailSection
          thumbnail_url={game.thumbnail_url}
          like_count={game.like_count}
          average_rating={game.average_rating}
        />
      </Grid.Item>

      <Grid.Item span="col-span-8 md:col-span-8 lg:col-span-8 h-full">
        <div className="game-detail-section h-full">
          <h2 className="game-detail-title">{game.title}</h2>
          <p className="mb-6 text-gray-700">{game.description}</p>
          <div className="flex flex-wrap gap-2">
            <GameTags
              genre={game.genre}
              category={game.category}
              difficulty={game.difficulty}
              isLink={true}
              size="md"
            />
          </div>
        </div>
      </Grid.Item>
    </Grid>
  );
}
