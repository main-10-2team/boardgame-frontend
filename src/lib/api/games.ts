import { fetcher } from '@/lib/fetcher';
import { GameListResponse } from '@/types/game/game';
import { getAccessToken } from '../getAccessToken';

export async function getGameListData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const token = await getAccessToken();

  // searchParams를 URLSearchParams로 변환
  const params = new URLSearchParams(
    Object.entries(searchParams).flatMap(([key, value]) => {
      if (typeof value === 'undefined') return [];
      if (Array.isArray(value)) {
        return value.map((v) => [key, v]);
      }
      return [[key, value]];
    }) || { page: 1 }
  );

  const endpoint = `/games/?${params.toString()}`;
  return fetcher<GameListResponse>(endpoint, undefined, token);
}

export async function getGameListDataClient(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const params = new URLSearchParams(
    Object.entries(searchParams).flatMap(([key, value]) => {
      if (typeof value === 'undefined') return [];
      if (Array.isArray(value)) {
        return value.map((v) => [key, v]);
      }
      return [[key, value]];
    }) || { page: 1 }
  );
  const res = await fetch(`/api/games?${params.toString()}`, {
    method: 'GET',
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
