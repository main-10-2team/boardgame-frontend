import { GameRankingItem } from '@/types/game/gameRanking';
import { cn } from '@/utils/cn';
import { RiHeartFill, RiStarFill } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';

interface RankingItemProps {
  rank: number;
  game: GameRankingItem;
}

const rankColorMap: Record<number, string> = {
  1: 'text-primary-400',
  2: 'text-primary-600',
  3: 'text-primary-800',
};

export default function RankingItem({ rank, game }: RankingItemProps) {
  const rankClass = rankColorMap[rank] || 'text-black';
  return (
    <>
      <div className={cn('py-4 text-5xl sm:text-right', rankClass)}>{rank}</div>
      <Link href={`/game/${game.game_id}`}>
        <div className="flex items-center gap-4 py-4">
          <Image
            src={game.thumbnail_url}
            alt={game.title}
            className="aspect-[4/5] rounded-lg object-cover"
            width={100}
            height={125}
          />
          <div className="flex min-w-0 flex-col gap-2 text-left">
            <div className="text-base">{game.title}</div>
            <div className="text-sm text-gray-400">{game.genre_name}</div>

            {/* 모바일 전용 좋아요/평점 */}
            <div className="flex items-center gap-2 text-sm whitespace-nowrap sm:hidden">
              <RiHeartFill size={16} className="text-[#cecece]" />
              <span className="mr-5">{game.like_count.toLocaleString()}</span>
              <RiStarFill size={16} className="text-[#cecece]" />
              <span>
                {game.average_rating.toFixed(2)}({game.reviews_count})
              </span>
            </div>
          </div>
        </div>
      </Link>
      {/* pc 전용 좋아요/평점 */}
      <div className="hidden flex-col items-center gap-y-2.5 text-sm sm:flex">
        <RiHeartFill size={16} className="text-[#cecece]" />
        <span>{game.like_count.toLocaleString()}</span>
      </div>
      <div className="hidden flex-col items-center gap-y-2.5 text-sm sm:flex">
        <RiStarFill size={16} className="text-[#cecece]" />
        <span>
          {game.average_rating.toFixed(2)}({game.reviews_count})
        </span>
      </div>
    </>
  );
}
