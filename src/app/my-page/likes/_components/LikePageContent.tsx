'use client';

import LikeList from '@/app/my-page/likes/_components/LikeList';
import { LikeListSkeleton } from '@/app/my-page/likes/_components/LikeListSkeleton';
import NoLikes from '@/app/my-page/likes/_components/NoLikes';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import { LikeItem, LikeListResponse } from '@/types/user/like';
import { useEffect, useState } from 'react';

export default function LikePageContent() {
  const [likes, setLikes] = useState<LikeItem[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('popular');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLikes = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/likes?page=${pageNum}&page_size=12`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data: LikeListResponse = await res.json();

      if (!data.results || data.results.status !== 'success')
        throw new Error('Invalid response');

      const newLikes = data.results.likes;
      setTotalCount(data.count);

      setLikes((prev) => (pageNum === 1 ? newLikes : [...prev, ...newLikes]));
      setHasNextPage((pageNum - 1) * 12 + newLikes.length < data.count);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchLikes(1);
  }, [sort]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchLikes(nextPage);
  };

  const handleRemoveLike = async (gameId: number) => {
    try {
      const res = await fetch('/api/likes/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_id: gameId }),
      });

      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }

      setLikes((prev) => prev.filter((like) => like.game_id !== gameId));
      setTotalCount((prev) => prev - 1);
    } catch (err) {
      console.error('좋아요 삭제 에러:', err);
      alert('좋아요 삭제 중 문제가 발생했어요.');
    }
  };

  const sortOptions = [
    { label: '인기순', value: 'popular' },
    { label: '최근에 담은 순', value: 'recent' },
    { label: '평점순', value: 'rating' },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold">좋아요</h1>
      <div className="flex justify-between">
        <span className="text-base">
          총<span className="ml-0.5 font-semibold">{totalCount}</span>개
        </span>
        <Dropdown
          options={sortOptions}
          selectedValue={sort}
          onChange={setSort}
        />
      </div>
      {loading && page === 1 ? (
        <LikeListSkeleton />
      ) : likes.length > 0 ? (
        <>
          <LikeList games={likes} onRemove={handleRemoveLike} />

          {/* 다음 페이지 로딩 중이면 아래쪽에 스켈레톤 */}
          {loading && page > 1 && <LikeListSkeleton />}

          {/* 다음 페이지가 있으면 더보기 버튼 */}
          {!loading && hasNextPage && (
            <Button className="mx-auto w-fit" onClick={handleLoadMore}>
              더보기
            </Button>
          )}
        </>
      ) : (
        <NoLikes />
      )}
    </>
  );
}
