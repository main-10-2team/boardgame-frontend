'use client';

import { GameData } from '@/types/game/game';
import Image from 'next/image';
import Link from 'next/link';
import RankItem from './RankItem';

interface RankItemListProps {
  games: GameData[];
  title: string;
}
export default function RankItemList({ games, title }: RankItemListProps) {
  return (
    <div className="relative space-y-4">
      <h4 className="text-primary-500 absolute -top-6 right-4 z-10 text-4xl font-bold italic">
        {title}
      </h4>
      {games.map((game, index) =>
        index === 0 ? (
          <Link
            key={game.game_id}
            href={`/games/${game.game_id}`}
            className="relative block h-55 overflow-hidden rounded-xl shadow-xl transition-transform hover:-translate-y-1"
          >
            <Image
              src={game.thumbnail_url}
              alt={game.title}
              fill
              priority={true}
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="text-6xl font-bold text-pink-400 italic">
                {index + 1}
              </div>
              <div className="text-lg font-bold text-white">{game.title}</div>
              <div className="line-clamp-2 text-sm text-gray-200">
                {game.description}
              </div>
            </div>
          </Link>
        ) : (
          <RankItem key={game.game_id} game={game} index={index} />
        )
      )}
    </div>
  );
}
