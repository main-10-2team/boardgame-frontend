import RankingPageContent from '@/components/ranking/RankingPageContent';
import { fetcher } from '@/lib/fetcher';
import { GameRankingItem } from '@/types/game/gameRanking';

async function getRankingGames(sortBy: string) {
  return await fetcher<GameRankingItem[]>(`/games?sort_by=${sortBy}`);
}

export default async function RankingPage() {
  const rankingGames = await getRankingGames('rating');
  return <RankingPageContent games={rankingGames} />;
}
