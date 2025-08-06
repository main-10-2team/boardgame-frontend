import { RiStarFill } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';

interface SimilarGameItemProps {
  game_id: number;
  title: string;
  image_url: string;
  average_rating: number;
}

export default function SimilarGameItem({
  game_id,
  title,
  image_url,
  average_rating,
}: SimilarGameItemProps) {
  return (
    <Link
      key={game_id}
      href={`/games/${game_id}`}
      className="group flex items-center gap-4"
    >
      <div className="relative aspect-[4/5] w-25 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={image_url}
          alt={title}
          width={238}
          height={357}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div>
        <h3 className="mb-2.5 truncate text-base font-semibold">{title}</h3>

        <div className="flex items-center gap-2">
          <RiStarFill className="h-4 w-4 text-gray-300" />
          <span className="text-xs">{average_rating?.toFixed(1) ?? '-'}</span>
        </div>
      </div>
    </Link>
  );
}
