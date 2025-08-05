'use client';
import { cn } from '@/utils/cn';
import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import { useState } from 'react';

interface LikeButtonProps {
  liked: boolean;
  gameId: number;
  className?: string;
}

export default function LikeButton({
  liked = false,
  gameId: _gameId,
  className,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked((prev) => !prev);
  };

  return (
    <button
      onClick={handleLikeClick}
      className={cn('z-10 cursor-pointer p-2', className)}
    >
      {isLiked ? (
        <RiHeartFill className="text-primary-400 h-6 w-6" />
      ) : (
        <RiHeartLine className="h-6 w-6 text-white" />
      )}
    </button>
  );
}
