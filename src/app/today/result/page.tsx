'use client';
import BoardPickResult from '@/components/preference/result/BoardPickResult';
import { TodaySubmitResponse } from '@/types/board-pick/boardPick';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'today:result';

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<TodaySubmitResponse | null>(null);
  // const res = await fetcher<GameListResponse>(`/games/?limit=6`);

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

  if (!data) return <div>불러오는 중...</div>;

  const [first, second, third, ...rest] = data.games;
  const result = [first, second, third];
  const similar = rest;

  return <BoardPickResult result={result} similar={similar} />;
}
