'use client';
import Spinner from '@/components/common/Spinner';
import BoardPickResult from '@/components/preference/result/BoardPickResult';
import { TodaySubmitResponse } from '@/types/board-pick/boardPick';
import { GameListItem } from '@/types/game/game';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'today:result';

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<TodaySubmitResponse | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      router.replace('/today'); // 세션 없으면 설문으로
      return;
    }
    try {
      setData(JSON.parse(raw) as TodaySubmitResponse);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      router.replace('/today');
    }
  }, [router]);

  if (!data)
    return (
      <div className="inner flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <Spinner size="lg" />
        <p className="mb-10 text-gray-500">결과를 불러오는 중</p>
      </div>
    );

  const [first, second, third, ...rest] = data.games;
  const result = [first, second, third].map((game, i) => ({
    game_id: game.game_id,
    title: game.title,
    difficulty: game.difficulty,
    thumbnail_url: game.thumbnail_url,
    average_rating: game.average_rating,
    like_count: game.like_count,
    genre: game.genre,
    category: game.category,
    quote: game.top_review?.content ?? '리뷰가 아직 없습니다.',
    reviewer: game.top_review?.nickname ?? '익명',
    description: game.description ?? '게임 설명이 준비중입니다.',
  }));

  const similar: GameListItem[] = rest.map((game, i) => ({
    game_id: game.game_id,
    title: game.title,
    difficulty: game.difficulty.toString(),
    thumbnail_url: game.thumbnail_url,
    average_rating: game.average_rating,
    like_count: game.like_count,
    reviews_count: game.reviews_count,
    genre: game.genre,
    category: game.category,
    age: 0,
    description: '',
    is_liked: false,
  }));

  return <BoardPickResult result={result} similar={similar} />;
}
