import { ApiError, fetcher } from '@/lib/fetcher';
import { GameDetail } from '@/types/game/game';
import { notFound } from 'next/navigation';
import { getAccessToken } from '../getAccessToken';

export async function getGameData(id: number) {
  const token = await getAccessToken();

  try {
    return await fetcher<GameDetail>(`/games/${id}`, undefined, token);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }
    throw e;
  }
}

export async function getGameDataClient(id: number) {
  const res = await fetch(`/api/games/${id}`, {
    method: 'GET',
  });
  console.log('여기들어옴');
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
