import ShareButton from '@/components/game/ShareButton';
import { RiHeartFill, RiStarFill } from '@remixicon/react';
import Image from 'next/image';

interface GameThumbnailSectionProps {
  image_url: string;
  like_count: number;
  average_rating?: number;
}
export default function GameThumbnailSection({
  image_url,
  like_count,
  average_rating,
}: GameThumbnailSectionProps) {
  return (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 md:aspect-[4/5]">
        <Image
          src={image_url || '/images/noImage.png'}
          alt="Filter Sidebar"
          width={238}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RiHeartFill className="h-4 w-4 text-gray-300" />
            <span>{like_count}</span>
          </div>
          <div className="flex items-center gap-2">
            <RiStarFill className="h-4 w-4 text-gray-300" />
            <span>{average_rating?.toFixed(1) ?? '-'}</span>
          </div>
        </div>
        <ShareButton />
      </div>
    </>
  );
}
