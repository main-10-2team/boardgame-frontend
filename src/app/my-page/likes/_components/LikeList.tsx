import LikeItemCard from '@/app/my-page/likes/_components/LikeItemCard';
import { LikeItem } from '@/types/user/like';

interface LikeListProps {
  games: LikeItem[];
  onRemove: (gameId: number) => void;
}

export default function LikeList({ games,onRemove }: LikeListProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <LikeItemCard key={game.game_id} game={game} onRemove={onRemove} />
      ))}
    </div>
  );
}
