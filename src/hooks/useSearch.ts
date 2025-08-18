import { GameListResponse } from '@/types/game/game';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

interface SearchResult {
  id: string;
  title: string;
  image: string;
  category: string;
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const pageSize = 6;

  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(
    async (searchQuery: string, pageNum: number) => {
      if (!searchQuery.trim()) return [];
      setIsLoading(true);

      try {
        const res = await fetch(
          `/api/games?keyword=${encodeURIComponent(searchQuery)}&page=${pageNum}&page_size=${pageSize}`
        );

        if (!res.ok) throw new Error('Network response was not ok');

        const data: GameListResponse = await res.json();
        const searchResults: SearchResult[] = data.results.map((game) => ({
          id: String(game.game_id),
          title: game.title,
          image: game.thumbnail_url || '',
          category: game.category || '',
        }));

        setIsNext(!!data.next); // 다음 페이지가 있으면 true

        setResults((prev) => {
          if (pageNum === 1) return searchResults; // 새 검색

          // append할 때 중복 제거
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems = searchResults.filter(
            (item) => !existingIds.has(item.id)
          );
          return [...prev, ...newItems];
        });
      } catch (error) {
        console.error('Error during search:', error);
        if (pageNum === 1) setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize]
  );

  const resetSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setPage(1);
  }, []);

  // 검색어 변경 시 초기화
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    setPage(1);
    performSearch(debouncedQuery, 1);
  }, [debouncedQuery]);

  useEffect(() => {
    if (!debouncedQuery || page === 1) return;
    performSearch(debouncedQuery, page);
  }, [debouncedQuery, page, performSearch]);

  return {
    query,
    results,
    isLoading,
    setQuery,
    loadMore: () => setPage((p) => p + 1), // 무한 스크롤 시 호출
    resetSearch,
    isNext,
  };
};
