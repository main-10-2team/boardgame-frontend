import { fetcher } from '@/lib/fetcher';
import { GameDetail } from '@/types/game/game';
import GameDetailUI from './_components/GameDetailUI';

async function getGameData(id: string) {
  const res = await fetcher<GameDetail>(`/games/${id}`);
  return res;
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameResponse = await getGameData(id);

  return <GameDetailUI game={gameResponse} />;
}
