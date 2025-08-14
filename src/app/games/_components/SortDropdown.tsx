import Dropdown from '@/components/common/Dropdown';
import { useState } from 'react';

export default function SortDropdown() {
  const [sort, setSort] = useState('popular');

  const sortOptions = [
    { label: '인기순', value: 'popular' },
    { label: '최근에 담은 순', value: 'recent' },
    { label: '평점순', value: 'rating' },
  ];
  return (
    <Dropdown options={sortOptions} selectedValue={sort} onChange={setSort} />
  );
}
