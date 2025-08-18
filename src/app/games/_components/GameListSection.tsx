import GameList from '@/components/game/GameList';
import { useInfiniteGames } from '@/hooks/useInfiniteGames';
import { GameListItem } from '@/types/game/game';
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

  if (status === 'pending') return <p>불러오는 중...</p>;
  if (status === 'error') return <p>에러 발생</p>;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">총 {total}개</span>
        <SortDropdown />
      </div>

      {/* 카드 그리드 */}
      <GameList games={games} columnNumber={3} imageRatio="1:1" />

      {isFetchingNextPage && <p>불러오는 중...</p>}
      {!hasNextPage && <p>더 이상 데이터가 없습니다.</p>}
    </section>
  );
}
