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

      // react-query에서 관리하는 현재 page
      params.set('page', String(pageParam));

      // page_size 기본값: 없으면 12
      params.set('page_size', String(filters.pageSize ?? 12));

      // filters 나머지 항목 세팅
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'page_size') {
          params.set(key, String(value));
        }
      });

      const res = await fetch(`/api/games?${params.toString()}`);
      if (!res.ok) throw new Error('게임 데이터를 불러오지 못했습니다.');
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextPage = url.searchParams.get('page');
        return nextPage ? Number(nextPage) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}
