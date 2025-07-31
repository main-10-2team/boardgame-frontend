'use client';
import { gameListData } from '@/assets/mocks/gameListData';
import Dropdown from '@/components/common/Dropdown';
import FilterSidebar from '@/components/game/FilterSidebar';
import GameList from '@/components/game/GameList';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Grid from '@/components/layout/Grid';
import { useState } from 'react';

const Page = () => {
  const [sort, setSort] = useState('popular');
  const [playTime, setPlayTime] = useState(60);

  const sortOptions = [
    { label: '인기순', value: 'popular' },
    { label: '최근에 담은 순', value: 'recent' },
    { label: '평점순', value: 'rating' },
  ];

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
          {/* 상단 정보: 총 개수 & 정렬 */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              총 {gameListData.total_count}개
            </span>
            <Dropdown
              options={sortOptions}
              selectedValue={sort}
              onChange={setSort}
            />
          </div>

          {/* 카드 그리드 */}
          <GameList
            games={gameListData.games}
            columnNumber={3}
            imageRatio="square"
          />
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default Page;
