import RankingPageContent from '@/components/ranking/RankingPageContent';
import { VALID_SORTS } from '@/types/game/gameRanking';
import { notFound } from 'next/navigation';

interface RankingPageProps {
  params: { sort: string };
}

export default function RankingPage({ params }: RankingPageProps) {
  const sort = VALID_SORTS.find((s) => s === params.sort);

  if (!sort) {
    notFound();
  }

  return <RankingPageContent sort={sort} />;
}
