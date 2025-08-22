import { GameListItem } from '@/types/game/game';
import { cn } from '@/utils/cn';
import { RiHeartFill, RiStarFill } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import GameTags from './GameTags';
import LikeButton from './LikeButton';

interface GameItemProps {
  game: GameListItem;
  imageRatio: '1:1' | '4:5' | '2:3'; // 비율: 1:1, 2:3, 16:9 등
  overlayInfo?: boolean;
  showLikeButton?: boolean;
  className?: string;
}
const ratioClasses = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '2:3': 'aspect-[2/3]',
};

export default function GameItem({
  game,
  imageRatio,
  overlayInfo = false,
  showLikeButton = true,
  className,
}: GameItemProps) {
  const {
    game_id,
    title,
    thumbnail_url,
    genre,
    category,
    like_count,
    is_liked,
    average_rating,
    difficulty,
  } = game;

  return (
    <Link
      href={`/games/${game_id}`}
      className={cn(
        'group relative flex flex-col gap-4 overflow-hidden rounded-xl',
        className
      )}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl bg-gray-100',
          ratioClasses[imageRatio]
        )}
      >
        <Image
          src={thumbnail_url}
          alt={title}
          width={238}
          height={357}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {overlayInfo && (
          <div className="">
            <h3 className="truncate text-sm font-semibold">{title}</h3>
          </div>
        )}

        {showLikeButton && (
          <LikeButton
            liked={is_liked}
            gameId={game_id}
            className={cn(
              'absolute right-2 z-10',
              overlayInfo ? 'top-2' : 'bottom-2'
            )}
          />
        )}
      </div>

      <div
        className={
          overlayInfo
            ? 'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent p-4 text-white'
            : ''
        }
      >
        <h3 className="mb-2.5 truncate text-base font-semibold">{title}</h3>
        {like_count != null || average_rating != null ? (
          <div
            className={cn(
              'mb-2 flex items-center gap-6 text-sm',
              overlayInfo ? 'text-white' : 'text-gray-500'
            )}
          >
            {like_count != null ? (
              <div className="flex items-center gap-2">
                <RiHeartFill className="h-4 w-4 text-gray-300" />
                <span className="text-xs">{like_count ?? 0}</span>
              </div>
            ) : null}
            {average_rating != null ? (
              <div className="flex items-center gap-2">
                <RiStarFill className="h-4 w-4 text-gray-300" />
                <span className="text-xs">
                  {average_rating?.toFixed(1) ?? '-'}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="mt-1 flex flex-wrap gap-1">
          <GameTags
            category={category}
            genre={genre}
            difficulty={difficulty}
            isLink={true}
          />
        </div>
      </div>
    </Link>
  );
}
