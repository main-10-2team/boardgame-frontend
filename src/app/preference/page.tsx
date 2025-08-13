'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiStarFill } from '@remixicon/react';
import Button from '@/components/common/Button';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/common/Toast';

const surveyGames = [
  {
    game_id: 1,
    title: '스플렌더',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.5,
  },
  {
    game_id: 2,
    title: '코드네임',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.2,
  },
  {
    game_id: 3,
    title: '팬데믹',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.3,
  },
  {
    game_id: 4,
    title: '티켓 투 라이드',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.1,
  },
  {
    game_id: 5,
    title: '셜록홈즈',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.4,
  },
  {
    game_id: 6,
    title: '아줄',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.6,
  },
  {
    game_id: 7,
    title: '킹 오브 도쿄',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.0,
  },
  {
    game_id: 8,
    title: '디셉션',
    thumbnail_url: '/images/splendar.png',
    average_rating: 3.9,
  },
  {
    game_id: 9,
    title: '윙스팬',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.7,
  },
  {
    game_id: 10,
    title: '7 원더스',
    thumbnail_url: '/images/splendar.png',
    average_rating: 4.3,
  },
];

export default function PreferencePage() {
  const router = useRouter();
  const { success, error, toasts } = useToast();
  const [likedGameIds, setLikedGameIds] = useState<Set<number>>(new Set());

  const toggleLike = (gameId: number) => {
    setLikedGameIds((prev) => {
      const next = new Set(prev);
      next.has(gameId) ? next.delete(gameId) : next.add(gameId);
      return next;
    });
  };

  const handleSubmit = async () => {
    const likedGames = Array.from(likedGameIds);

    try {
      // await fetch('/api/user/preferences', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ liked_games: likedGames }),
      // });

      success('제출이 완료되었습니다');
      setTimeout(() => router.push('/'), 1000);
    } catch {
      error('제출 중 오류가 발생했습니다');
    }
  };

  const handleSkip = () => router.push('/');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-200 p-6">
      <Toast toasts={toasts} />

      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">취향 분석</h1>
          <p className="text-sm text-gray-600">
            간단한 질문 몇 개로 당신만의 플레이 스타일을 찾아드릴게요.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {surveyGames.map((game) => {
            const isLiked = likedGameIds.has(game.game_id);

            return (
              <div
                key={game.game_id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-center p-4">
                  <div className="mr-4 h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={game.thumbnail_url}
                      alt={game.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-800">
                      {game.title}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <RiStarFill className="h-4 w-4" color="#ffe837" />
                      <span className="ml-1 text-sm text-gray-600">
                        {game.average_rating}
                      </span>
                    </div>
                  </div>

                  <div className="ml-4">
                    <button
                      onClick={() => toggleLike(game.game_id)}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                        isLiked
                          ? 'border-pink-500 bg-pink-500 text-white hover:bg-pink-600'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      좋아요
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="md"
            className="h-12 w-full rounded-2xl text-lg"
          >
            제출하기
          </Button>

          <Button
            onClick={handleSkip}
            variant="secondary"
            size="md"
            className="h-12 w-full rounded-2xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
          >
            건너뛰기
          </Button>
        </div>
      </div>
    </div>
  );
}
