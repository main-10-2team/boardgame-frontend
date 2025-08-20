'use client';
import GameListSection from '@/app/games/_components/GameListSection';
import BreadcrumbsSkeleton from '@/components/layout/BreadcrumbsSkeleton';
import Grid from '@/components/layout/Grid';
import { getGameListDataClient } from '@/lib/api/games';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import FilterSidebarSkeleton from './FilterSidebarSkeleton';

const Breadcrumbs = dynamic(() => import('@/components/layout/Breadcrumbs'), {
  loading: () => <BreadcrumbsSkeleton />,
  ssr: false,
});
const FilterSidebar = dynamic(
  () => import('@/app/games/_components/FilterSidebar'),
  {
    loading: () => <FilterSidebarSkeleton />,
    ssr: false,
  }
);

export default function GameListUI({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data: gameListData, isLoading } = useQuery({
    queryKey: ['games', searchParams],
    queryFn: () => getGameListDataClient(searchParams),
  });
  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !gameListData) return notFound();

  return (
    <div className="inner pt-6 pb-40">
      <Breadcrumbs />
      <h1 className="mt-4 mb-6 text-center text-2xl font-bold md:mt-6 md:mb-12 md:text-4xl">
        보드게임 찾기
      </h1>
      <Grid>
        {/* 좌측 필터 */}
        <Grid.Item span="hidden md:block md:col-span-4 lg:col-span-3">
          <FilterSidebar />
        </Grid.Item>

        {/* 우측 콘텐츠 */}
        <Grid.Item span="col-span-8 md:col-span-8 lg:col-span-9">
          <GameListSection
            total={gameListData.count}
            gameListData={gameListData.results}
          />
        </Grid.Item>
      </Grid>
    </div>
  );
}
