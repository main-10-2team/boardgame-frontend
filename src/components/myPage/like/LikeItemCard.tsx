import ConfirmModal from '@/components/common/modal/ConfirmModal';
import LikeCancelButton from '@/components/myPage/like/LikeCancelButton';
import { LikeItem } from '@/types/user/like';
import { RiStarFill } from '@remixicon/react';
import Link from 'next/link';
import { useState } from 'react';

interface LikeItemCardProps {
  game: LikeItem;
}

export default function LikeItemCard({ game }: LikeItemCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // 로직~~
  };

  return (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <div className="absolute top-12 right-2" onClick={handleLikeClick}>
          <LikeCancelButton onClick={handleLikeClick} isLiked={true} />
        </div>
        {/* 배경 이미지 */}
        <Link href={`/games/${game.game_id}`}>
          <img
            src={game.image_url}
            alt={game.title}
            className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute right-0 bottom-0 left-0 z-5 bg-gradient-to-t from-black/65 to-transparent px-3 pt-8 pb-3 text-white">
            <p className="font-semibold">{game.title}</p>
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-200">
              <RiStarFill size={12} />
              {game.average_rating.toFixed(1)}
            </div>
          </div>
        </Link>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        modalId={`unlike-${game.game_id}`}
        title="알림"
        message="좋아요를 취소하시겠어요?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
