'use client';

import { useSearchParams } from 'next/navigation';

export function useGameFilters() {
  const searchParams = useSearchParams();
  return {
    keyword: searchParams.get('keyword') ?? '',
    page: Number(searchParams.get('page') ?? 1),
    pageSize: Number(searchParams.get('page_size') ?? 12),
    categories: searchParams.get('categories')?.split(',') ?? [],
    genres: searchParams.get('genres')?.split(',') ?? [],
    players: Number(searchParams.get('players') ?? 0),
    playtime_min_minutes: Number(searchParams.get('playtime_min_minutes') ?? 0),
    playtime_max_minutes: Number(searchParams.get('playtime_max_minutes') ?? 0),
    difficulty: searchParams.get('difficulty') ?? null,
    age: searchParams.get('age') ?? null,
  };
}
