import { RiStarFill } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';

interface SimilarGameItemProps {
  gameId: number;
  title: string;
  thumbnailUrl: string;
  averageRating: number;
}

export default function SimilarGameItem({
  gameId,
  title,
  thumbnailUrl,
  averageRating,
}: SimilarGameItemProps) {
  return (
    <Link
      key={gameId}
      href={`/games/${gameId}`}
      className="group flex items-center gap-4"
    >
      <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={thumbnailUrl}
          alt={title}
          width={238}
          height={357}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="w-full min-w-0">
        <h3 className="mb-2.5 line-clamp-2 text-base font-semibold">{title}</h3>

        <div className="flex items-center gap-2">
          <RiStarFill className="h-4 w-4 text-gray-300" />
          <span className="text-xs">{averageRating?.toFixed(1) ?? '-'}</span>
        </div>
      </div>
    </Link>
  );
}
