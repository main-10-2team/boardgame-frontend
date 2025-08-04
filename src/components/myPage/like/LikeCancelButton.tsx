import { RiHeartFill, RiHeartLine } from '@remixicon/react';

interface LikeButtonProps {
  isLiked: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function LikeCancelButton({
  isLiked,
  onClick,
}: LikeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 bottom-0 z-10 cursor-pointer p-2"
      aria-label="좋아요 버튼"
    >
      {isLiked ? (
        <RiHeartFill size={24} className="text-primary-400" />
      ) : (
        <RiHeartLine className="h-6 w-6 text-white" />
      )}
    </button>
  );
}
