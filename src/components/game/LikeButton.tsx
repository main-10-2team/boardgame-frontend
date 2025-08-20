'use client';
import { useToggleLike } from '@/hooks/react-query/useToggleLike';
import { cn } from '@/utils/cn';
import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import { useState } from 'react';

interface LikeButtonProps {
  liked: boolean;
  gameId: number;
  className?: string;
  lineColor?: string;
}

export default function LikeButton({
  liked = false,
  gameId,
  className,
  lineColor = 'text-white',
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const { mutate } = useToggleLike(gameId);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked((prev) => !prev); // ✅ Optimistic UI
    mutate(undefined, {
      onError: () => setIsLiked(liked), // 실패 시 롤백
    });
  };

  return (
    <button
      onClick={handleClick}
      className={cn('z-10 cursor-pointer p-2', className)}
    >
      {isLiked ? (
        <RiHeartFill className="text-primary-400 h-6 w-6" />
      ) : (
        <RiHeartLine className={`h-6 w-6 ${lineColor}`} />
      )}
    </button>
  );
}
