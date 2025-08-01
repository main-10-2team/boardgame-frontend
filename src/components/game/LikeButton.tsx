'use client';
import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import { useState } from 'react';

interface LikeButtonProps {
  liked: boolean;
  gameId: number;
}

export default function LikeButton({
  liked = false,
  gameId: _gameId,
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
      className="absolute right-0 bottom-0 z-10 cursor-pointer p-2"
    >
      {isLiked ? (
        <RiHeartFill className="text-primary-400 h-6 w-6" />
      ) : (
        <RiHeartLine className="h-6 w-6 text-white" />
      )}
    </button>
  );
}
