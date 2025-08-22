// app/preference/PreferenceClient.tsx
'use client';

import { useState, useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { RiStarFill } from '@remixicon/react';
import Button from '@/components/common/Button';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/common/Toast';
import { submitSurvey } from '@/actions/preference';
import { PreferenceState, Game } from '@/types/preference';

interface PreferenceClientProps {
  games: Game[];
}

const initialState: PreferenceState = {
  success: false,
  error: null,
};

function SubmitButton({ hasSelection }: { hasSelection: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      className="h-12 w-full rounded-2xl text-lg"
      disabled={pending || !hasSelection}
    >
      {pending ? '제출 중...' : '제출하기'}
    </Button>
  );
}

export default function PreferenceClient({ games }: PreferenceClientProps) {
  const router = useRouter();
  const { success, error, toasts } = useToast();
  const [likedGameIds, setLikedGameIds] = useState<Set<number>>(new Set());
  const [state, formAction] = useActionState(submitSurvey, initialState);

  // 서버 액션 결과 처리 (의존성 배열 수정)
  useEffect(() => {
    if (state.success) {
      success(state.message || '제출이 완료되었습니다');
      setTimeout(() => router.push('/'), 1000);
    } else if (state.error) {
      error(state.error);
    }
  }, [state.success, state.error, state.message]); // 함수들 제거

  const toggleLike = (gameId: number) => {
    setLikedGameIds((prev) => {
      const next = new Set(prev);
      next.has(gameId) ? next.delete(gameId) : next.add(gameId);
      return next;
    });
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

        <form action={formAction}>
          {/* 선택된 게임들을 hidden input으로 추가 */}
          {Array.from(likedGameIds).map((gameId) => (
            <input
              key={gameId}
              type="hidden"
              name="liked_games"
              value={gameId}
            />
          ))}

          <div className="mb-8 space-y-4">
            {games.map((game) => {
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
                        type="button"
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
            <SubmitButton hasSelection={likedGameIds.size > 0} />

            <Button
              type="button"
              onClick={handleSkip}
              variant="secondary"
              size="md"
              className="h-12 w-full rounded-2xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            >
              건너뛰기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
