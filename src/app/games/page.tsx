import GameListUI from '@/app/games/_components/GameListUI';
import { fetcher } from '@/lib/fetcher';
import { GameListResponse } from '@/types/game/game';

async function getGameListData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolvedParams = await searchParams;

  // searchParams를 URLSearchParams로 변환
  const params = new URLSearchParams(
    Object.entries(resolvedParams).flatMap(([key, value]) => {
      if (typeof value === 'undefined') return [];
      if (Array.isArray(value)) {
        return value.map((v) => [key, v]);
      }
      return [[key, value]];
    })
  );

  // 기본 URL 설정
  const endpoint = `/games/?${params.toString()}`;

  const res = await fetcher<GameListResponse>(endpoint);
  return res;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const gameListData = await getGameListData({ searchParams });
  return <GameListUI gameListData={gameListData} />;
}
