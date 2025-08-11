import { GameRankingItem } from '@/types/game/gameRanking';
import { cn } from '@/utils/cn';
import RankingItem from './RankingItem';

interface RankingListProps {
  games: GameRankingItem[];
}

const headers = [
  { label: '순위', align: 'text-center' },
  { label: '게임정보', align: 'text-left' },
  { label: '좋아요', align: 'text-center' },
  { label: '평점', align: 'text-center' },
];

const baseHeaderClass = 'hidden sm:block';

export default function RankingList({ games }: RankingListProps) {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-[auto_1fr] items-start gap-x-4 gap-y-6 text-sm sm:grid-cols-[auto_1fr_auto_auto]',
        'sm:items-center'
      )}
    >
      {headers.map(({ label, align }) => (
        <div key={label} className={cn(baseHeaderClass, align)}>
          {label}
        </div>
      ))}

      {games.map((game, idx) => (
        <RankingItem key={game.game_id} rank={idx + 1} game={game} />
      ))}
    </div>
  );
}
