import { GameListData } from '@/types/game/game';
import { cn } from '@/utils/cn';
import GameItem from './GameItem';

interface GameListProps {
  games: GameListData[];
  columnNumber?: number;
  imageRatio?: 'square' | 'portrait' | 'landscape';
}

const GameList = ({
  games,
  columnNumber = 3,
  imageRatio = 'portrait',
}: GameListProps) => {
  return (
    <div
      className={cn(
        `grid grid-cols-2 gap-6`,
        columnNumber === 3 && 'md:grid-cols-3',
        columnNumber === 4 && 'md:grid-cols-4',
        columnNumber === 5 && 'md:grid-cols-5',
        columnNumber === 6 && 'md:grid-cols-6'
      )}
    >
      {games.map((game) => (
        <GameItem key={game.game_id} game={game} imageRatio={imageRatio} />
      ))}
    </div>
  );
};

export default GameList;
