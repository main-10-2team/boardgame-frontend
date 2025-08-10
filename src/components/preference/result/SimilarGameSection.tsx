import GameItem from '@/components/game/GameItem';
import { Game } from '@/types/game/game';

interface SimilarGameSectionProps {
  similar: Game[];
}

export default function SimilarGameSection({
  similar,
}: SimilarGameSectionProps) {
  return (
    <section className="inner mt-15">
      <h2 className="mb-6 text-2xl font-bold md:mb-8 md:text-3xl lg:text-4xl">
        비슷한 게임
      </h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* 카드 그리드 */}
        {similar.map((g) => (
          <GameItem
            key={g.game_id}
            game={g}
            imageRatio="4:5"
            showLikeButton={true}
            overlayInfo={true}
          />
        ))}
      </ul>
    </section>
  );
}
