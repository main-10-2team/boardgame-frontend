import NoReviews from '@/app/my-page/reviews/_components/NoReviews';
import ReviewList from '@/app/my-page/reviews/_components/ReviewList';
import ReviewListSkeleton from '@/app/my-page/reviews/_components/ReviewListSkeleton';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import { ReviewItem } from '@/types/user/review';
import { useEffect, useState } from 'react';

export default function ReviewPageContent() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [sort, setSort] = useState('recent');

  const fetchReviews = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews/list?page=${pageNum}&limit=10`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const newReviews = data.reviews;

      setTotalCount(data.total_reviews ?? 0);
      setReviews((prev) =>
        pageNum === 1 ? newReviews : [...prev, ...newReviews]
      );
      setHasNextPage(data.total_pages > pageNum);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchReviews(1);
  }, [sort]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage);
  };

  const sortOptions = [
    { label: '인기순', value: 'popular' },
    { label: '최근에 담은 순', value: 'recent' },
    { label: '평점순', value: 'rating' },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold">내 리뷰</h1>
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
        <ReviewListSkeleton />
      ) : reviews.length === 0 ? (
        <NoReviews />
      ) : (
        <>
          <ReviewList reviews={reviews} />

          {loading && page > 1 && (
            <div className="mt-4">
              <ReviewListSkeleton />
            </div>
          )}

          {!loading && hasNextPage && (
            <Button className="mx-auto w-fit" onClick={handleLoadMore}>
              더보기
            </Button>
          )}
        </>
      )}
    </>
  );
}
