'use client';
import Dropdown from '@/components/common/Dropdown';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState('popularity');

  const sortOptions = [
    { label: '인기순', value: 'popularity' },
    { label: '최신순', value: 'latest' },
    { label: '평점순', value: 'rating' },
    { label: '리뷰순', value: 'review' },
  ];

  // URL 쿼리 파라미터에 따라 초기 정렬값 설정
  useEffect(() => {
    const sortByParam = searchParams.get('sort_by');
    if (sortByParam) {
      setSort(sortByParam);
    }
  }, [searchParams]);

  // 선택된 정렬 옵션을 URL 쿼리스트링에 추가
  const handleSortChange = (selectedValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sort_by', selectedValue);

    // 현재 URL에 새로운 쿼리 파라미터를 적용하여 페이지 이동
    router.push(`/games?${newSearchParams.toString()}`);
  };

  return (
    <Dropdown
      options={sortOptions}
      selectedValue={sort}
      onChange={handleSortChange}
    />
  );
}
