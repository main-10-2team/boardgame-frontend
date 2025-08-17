import { fetcher } from '@/lib/fetcher';
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

  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = searchQuery.toLowerCase();
    try {
      const res = await fetcher<GameListResponse>(
        `/games?keyword=${encodeURIComponent(normalizedQuery)}&page=1&page_size=6`
      );

      const searchResults: SearchResult[] = res.results.map((game) => ({
        id: String(game.game_id),
        title: game.title,
        image: game.thumbnail_url || '',
        category: game.category || '',
      }));
      setResults(searchResults);
    } catch (error) {
      console.error('Error during search:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  return {
    query,
    results,
    isLoading,
    setQuery,
    resetSearch,
  };
};
