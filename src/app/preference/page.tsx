// app/preference/page.tsx
'use client';

import { useState } from 'react';
import SurveyGameCard from '@/components/survey/SurveyGameCard';

const mockSurveyGames = [
  {
    id: 1,
    title: '스플렌더',
    image_url: '/images/splendor.jpg',
    genre: '전략',
  },
  {
    id: 2,
    title: '코드네임',
    image_url: '/images/codenames.jpg',
    genre: '파티',
  },
  {
    id: 3,
    title: '팬데믹',
    image_url: '/images/pandemic.jpg',
    genre: '협력',
  },
  {
    id: 4,
    title: '티켓 투 라이드',
    image_url: '/images/ticket-to-ride.jpg',
    genre: '가족',
  },
  {
    id: 5,
    title: '셜록홈즈',
    image_url: '/images/sherlock.jpg',
    genre: '추리',
  },
];

export default function PreferencePage() {
  const [likedGenres, setLikedGenres] = useState<string[]>([]);

  const handleGameLike = (gameId: number, genre: string, isLiked: boolean) => {
    if (isLiked) {
      setLikedGenres((prev) =>
        prev.includes(genre) ? prev : [...prev, genre]
      );
    } else {
      setLikedGenres((prev) => prev.filter((g) => g !== genre));
    }
  };

  const handleSubmit = async () => {
    if (likedGenres.length === 0) {
      alert('최소 하나의 게임은 선택해주세요!');
      return;
    }

    console.log('좋아요한 장르들:', likedGenres);

    // API 호출
    // try {
    //   const response = await fetch('/api/user/preferences', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       preferredGenres: likedGenres
    //     })
    //   });
    //   const result = await response.json();
    //   // 성공시 처리
    //   alert('제출되었습니다!');
    // } catch (error) {
    //   console.error('설문 제출 실패:', error);
    // }

    // 임시로 성공 알림
    alert('제출되었습니다!');
  };

  const handleSkip = () => {
    console.log('설문 건너뛰기');
    // router.push('/');
  };

  return (
    <div className="bg-slate-950 p-6 pb-20">
      <div className="mx-auto max-w-md">
        <div className="mb-8 rounded-2xl bg-slate-900 p-6">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-2xl font-bold text-white">취향분석</h1>
            <p className="text-sm leading-relaxed text-gray-400">
              간단한 질문 몇 개로 당신만의 플레이 스타일을 찾아드릴게요.
            </p>
            {likedGenres.length > 0 && (
              <div className="mt-4 text-xs text-pink-400">
                {likedGenres.join(', ')}
              </div>
            )}
          </div>
          <div className="space-y-6">
            {mockSurveyGames.map((game, index) => (
              <div key={game.id}>
                <SurveyGameCard game={game} onGameLike={handleGameLike} />
                {index < mockSurveyGames.length - 1 && (
                  <hr className="mt-6 border-slate-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-pink-500 py-4 text-lg font-semibold text-white transition-colors hover:bg-pink-600"
          >
            저장 {likedGenres.length > 0 && `(${likedGenres.length}개 선택)`}
          </button>
          <button
            onClick={handleSkip}
            className="w-full rounded-xl bg-white py-4 text-lg font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            건너뛰기
          </button>
        </div>
      </div>
    </div>
  );
}
