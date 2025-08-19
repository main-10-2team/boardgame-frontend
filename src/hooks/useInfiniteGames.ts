'use client';

import { GameListResponse } from '@/types/game/game';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useGameFilters } from './games/useGameFilters';

export function useInfiniteGames() {
  const filters = useGameFilters();

  return useInfiniteQuery<GameListResponse>({
    queryKey: ['games', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();

      // react-query에서 관리하는 현재 페이지
      params.set('page', String(pageParam));
      params.set('page_size', '12');

      // filters 나머지 값만 세팅
      Object.entries(filters).forEach(([key, value]) => {
        const isFalsy =
          value === undefined ||
          value === null ||
          value === '' ||
          value === 0 ||
          (Array.isArray(value) && value.length === 0);

        if (!isFalsy) {
          params.set(key, String(value));
        }
      });

      const res = await fetch(`/api/games?${params.toString()}`);
      if (!res.ok) throw new Error('게임 데이터를 불러오지 못했습니다.');
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    initialPageParam: 1,
  });
}
