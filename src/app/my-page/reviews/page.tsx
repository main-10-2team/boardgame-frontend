'use client';

import { likeList } from '@/assets/mocks/likeList';
import { MY_REVIEW_LIST } from '@/assets/mocks/myReviewList';
import Dropdown from '@/components/common/Dropdown';
import Grid from '@/components/layout/Grid';
import ReviewList from '@/components/my-page/review/ReviewList';
import MyPageSideMenu from '@/components/my-page/SideMenu';
import { useState } from 'react';

export default function ReviewPage() {
  const [sort, setSort] = useState('popular');

  const sortOptions = [
    { label: '인기순', value: 'popular' },
    { label: '최근에 담은 순', value: 'recent' },
    { label: '평점순', value: 'rating' },
  ];

  return (
    <main className="inner flex flex-1 flex-col pt-10 pb-30">
      <Grid>
        <Grid.Item span="col-span-12 md:col-span-3">
          <MyPageSideMenu />
        </Grid.Item>

        <Grid.Item span="col-span-12 md:col-span-9 md:pt-18 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">내 리뷰</h1>
          <div className="flex justify-between">
            <span className="text-base">
              총
              <span className="ml-0.5 font-semibold">
                {likeList.total_count}
              </span>
              개
            </span>
            <Dropdown
              options={sortOptions}
              selectedValue={sort}
              onChange={setSort}
            />
          </div>
          <ReviewList reviews={MY_REVIEW_LIST.reviews} />
        </Grid.Item>
      </Grid>
    </main>
  );
}
