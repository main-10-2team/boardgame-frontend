import { GameData } from '@/types/game/game';
import { cn } from '@/utils/cn';
import { RiHeartFill, RiStarFill } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import GameTags from '../game/GameTags';

interface RankItemProps {
  game: GameData;
  index: number;
}
export default function RankItem({ game, index }: RankItemProps) {
  return (
    <Link
      key={game.game_id}
      href={`/games/${game.game_id}`}
      className="flex items-stretch gap-6 overflow-hidden rounded-xl bg-white shadow-xl transition-transform hover:-translate-y-1 lg:gap-8"
    >
      <div className="relative aspect-square h-full max-h-30 shrink-0">
        <Image
          src={game.thumbnail_url}
          alt={game.title}
          width={140}
          height={140}
          className="h-full w-full object-cover"
        />
        <div
          className={cn(
            'text-primary-100 absolute top-3 left-2 text-5xl font-bold italic',
            index === 1 && 'text-primary-300',
            index === 2 && 'text-primary-200'
          )}
        >
          {index + 1}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2">
        <h3 className="text-base font-bold">{game.title}</h3>
        <div className="flex gap-4">
          {game.like_count && (
            <div className="flex items-center gap-2">
              <RiHeartFill className="h-4 w-4 text-gray-300" />
              <span className="text-xs">{game.like_count ?? 0}</span>
            </div>
          )}
          {game.average_rating && (
            <div className="flex items-center gap-2">
              <RiStarFill className="h-4 w-4 text-gray-300" />
              <span className="text-xs">
                {game.average_rating?.toFixed(1) ?? '-'}
              </span>
            </div>
          )}
        </div>
        <div className="mt-1 flex flex-wrap gap-1 text-xs text-white">
          <GameTags
            genre_name={game.genre_name}
            min_players={game.min_players}
            max_players={game.max_players}
            difficulty={game.difficulty}
            isLink={true}
            size="md"
          />
        </div>
      </div>
    </Link>
  );
}
