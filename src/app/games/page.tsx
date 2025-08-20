import GameListUI from '@/app/games/_components/GameListUI';
import { getGameListData } from '@/lib/api/games';
import getQueryClient from '@/lib/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;

  const title = category
    ? `보드큐 - ${category} 보드게임 찾기`
    : '보드큐 - 보드게임 찾기';
  const description = category
    ? `${category} 보드게임을 한눈에 확인하세요`
    : '다양한 보드게임을 쉽게 검색하세요!';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = getQueryClient();

  const resolvedParams = await searchParams;

  await queryClient.prefetchQuery({
    queryKey: ['games', resolvedParams],
    queryFn: () => getGameListData(resolvedParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameListUI searchParams={resolvedParams} />
    </HydrationBoundary>
  );
}
