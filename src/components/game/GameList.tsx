import { GameListData } from '@/types/game/game';
import { cn } from '@/utils/cn';
import GameItem from './GameItem';

interface GameListProps {
  games: GameListData[];
  columnNumber?: number;
  imageRatio?: '1:1' | '4:5' | '2:3';
  overlayInfo?: boolean;
  showLikeButton?: boolean;
  className?: string;
}

export default function GameList({
  games,
  columnNumber = 3,
  imageRatio = '4:5',
  overlayInfo,
  showLikeButton,
}: GameListProps) {
  return (
    <div
      className={cn(
        `grid grid-cols-2 gap-6`,
        columnNumber === 3 && 'lg:grid-cols-3',
        columnNumber === 4 && 'lg:grid-cols-4',
        columnNumber === 5 && 'lg:grid-cols-5',
        columnNumber === 6 && 'lg:grid-cols-6'
      )}
    >
      {games.map((game) => (
        <GameItem
          key={game.game_id}
          game={game}
          overlayInfo={overlayInfo}
          imageRatio={imageRatio}
          showLikeButton={showLikeButton}
        />
      ))}
    </div>
  );
}
