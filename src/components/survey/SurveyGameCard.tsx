// components/survey/SurveyGameCard.tsx
'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';

interface SurveyGame {
  id: number;
  title: string;
  image_url: string;
  genre: string;
}

interface SurveyGameCardProps {
  game: SurveyGame;
  onGameLike: (gameId: number, genre: string, isLiked: boolean) => void;
}

export default function SurveyGameCard({
  game,
  onGameLike,
}: SurveyGameCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = () => {
    if (isLiked) return; // 이미 좋아요 상태면 무시

    setIsLiked(true);
    setIsDisliked(false); // 별로였어요 해제
    onGameLike(game.id, game.genre, true);
  };

  const handleDislike = () => {
    if (isDisliked) return; // 이미 별로였어요 상태면 무시

    setIsDisliked(true);
    setIsLiked(false); // 좋아요 해제
    onGameLike(game.id, game.genre, false);
  };

  return (
    <div className="flex items-center gap-4">
      {/* 게임 이미지 */}
      <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-yellow-400">
        <img
          src="/images/splender.png"
          alt={game.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* 게임 정보 */}
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{game.title}</h3>
          <span className="text-sm text-gray-400">#{game.genre}</span>
        </div>
      </div>

      {/* 평가 버튼들 */}
      <div className="flex flex-shrink-0 flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLike}
          disabled={isLiked} // 이미 선택된 상태면 비활성화
          className={`text-xs ${
            isLiked
              ? '!border-pink-500 !bg-pink-500 !text-white hover:!bg-pink-600'
              : '!border-gray-600 !bg-gray-800 !text-gray-300 hover:!bg-gray-700'
          }`}
        >
          좋아요
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDislike}
          disabled={isDisliked} // 이미 선택된 상태면 비활성화
          className={`text-xs ${
            isDisliked
              ? '!border-gray-600 !bg-gray-600 !text-white hover:!bg-gray-700'
              : '!border-gray-600 !bg-gray-800 !text-gray-300 hover:!bg-gray-700'
          }`}
        >
          별로였어요
        </Button>
      </div>
    </div>
  );
}
