import LikeItemCard from '@/components/myPage/like/LikeItemCard';
import { LikeItem } from '@/types/user/like';

interface LikeListProps {
  games: LikeItem[];
}

export default function LikeList({ games }: LikeListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <LikeItemCard key={game.game_id} game={game} />
      ))}
    </div>
  );
}
