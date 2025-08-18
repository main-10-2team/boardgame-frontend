import RankingPageContent from '@/app/ranking/_components/RankingPageContent';
import { fetcher } from '@/lib/fetcher';
import { GameListResponse } from '@/types/game/gameRanking';

interface RankingPageProp {
  searchParams: Promise<{ sort?: string | string[] }>;
}

export default async function RankingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const sort = typeof params.sort === 'string' ? params.sort : 'popularity';
  const endpoint = `/games?sort_by=${sort}&page_size=10`;
  const res = await fetcher<GameListResponse>(endpoint, { cache: 'no-store' });
  const games = res.results;

  return <RankingPageContent games={games} />;
}
