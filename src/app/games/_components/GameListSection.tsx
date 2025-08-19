import GameList from '@/components/game/GameList';
import GameListSkeleton from '@/components/game/GameListSkeleton';
import { useInfiniteGames } from '@/hooks/useInfiniteGames';
import { GameListItem } from '@/types/game/game';
import { RiArrowDownSLine } from '@remixicon/react';
import { useEffect } from 'react';
import SortDropdown from './SortDropdown';
interface GameListSectionProps {
  total: number;
  gameListData: GameListItem[];
}

export default function GameListSection({
  total,
  gameListData,
}: GameListSectionProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteGames();

  // 초기데이터를 react-query 캐시에 seed
  const games = data?.pages.flatMap((page) => page.results) ?? gameListData;

  // 스크롤 이벤트로 다음 페이지 호출
  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending')
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            총
            <span className="ml-1 inline-block h-4 w-8 animate-pulse rounded bg-gray-200" />
            개
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-start gap-1 text-base font-medium text-black"
          >
            정렬
            <RiArrowDownSLine className="h-4 w-4" />
          </button>
        </div>
        <GameListSkeleton imageRatio="1:1" count={12} />
      </section>
    );
  if (status === 'error') return <p>에러 발생</p>;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">총 {total}개</span>
        <SortDropdown />
      </div>

      {/* 카드 그리드 */}
      <GameList games={games} columnNumber={3} imageRatio="1:1" />

      {isFetchingNextPage && (
        <div className="mt-6">
          <GameListSkeleton imageRatio="1:1" count={12} />
        </div>
      )}
    </section>
  );
}
