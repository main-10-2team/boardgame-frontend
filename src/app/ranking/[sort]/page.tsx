import RankingPageContent from '@/components/ranking/RankingPageContent';
import { VALID_SORTS, ValidSort } from '@/types/game/gameRanking';
import { notFound } from 'next/navigation';

export default async function RankingPage({
  params,
}: {
  params: Promise<{ sort: string }>;
}) {
  const { sort } = await params;

  if (!VALID_SORTS.includes(sort as ValidSort)) {
    notFound();
  }

  return <RankingPageContent sort={sort as ValidSort} />;
}
