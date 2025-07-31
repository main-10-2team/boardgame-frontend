import { GameListData } from '@/types/game/game';
import { cn } from '@/utils/cn';
import { formatDifficulty } from '@/utils/formatDifficulty';
import { RiHeartFill, RiStarFill } from '@remixicon/react';
import Link from 'next/link';
import LikeButton from './LikeButton';

interface GameItemProps {
  game: GameListData;
  imageRatio: 'square' | 'portrait' | 'landscape'; // 비율: 1:1, 2:3, 16:9 등
  overlayInfo?: boolean;
  showLikeButton?: boolean;
  className?: string;
}
const ratioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[2/3]',
  landscape: 'aspect-video',
};

const GameItem = ({
  game,
  imageRatio,
  overlayInfo = false,
  showLikeButton = true,
  className,
}: GameItemProps) => {
  const {
    game_id,
    title,
    image_url,
    like_count,
    is_liked,
    average_rating,
    genre_name,
    min_players,
    max_players,
    difficulty,
  } = game;
  const tags = [
    genre_name,
    `${min_players}~${max_players}인용`,
    `난이도_${difficulty ? formatDifficulty(difficulty) : '알수없음'}`,
  ];

  return (
    <Link
      href={`/games/${game_id}`}
      className={cn('group flex flex-col gap-2', className)}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl bg-gray-100',
          ratioClasses[imageRatio]
        )}
      >
        <img
          src={image_url}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {overlayInfo && (
          <div className="absolute inset-0 flex flex-col justify-end bg-black/50 p-2 text-white">
            <h3 className="truncate text-sm font-semibold">{title}</h3>
          </div>
        )}

        {showLikeButton && <LikeButton liked={is_liked} gameId={game_id} />}
      </div>

      <h3 className="truncate text-sm font-medium">{title}</h3>
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <RiHeartFill className="h-4 w-4 text-gray-300" />
          <span className="text-xs">{like_count ?? 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <RiStarFill className="h-4 w-4 text-gray-300" />
          <span className="text-xs">{average_rating?.toFixed(1) ?? '-'}</span>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap gap-1">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-primary-50 text-primary-500 rounded-full px-2 py-1 text-[10px] font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
};
export default GameItem;
