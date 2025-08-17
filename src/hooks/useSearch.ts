import { gameListData } from '@/assets/mocks/gameListData';
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

  const performSearch = useCallback((searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = searchQuery.toLowerCase();
    return gameListData.games
      .filter((game) => game.title.toLowerCase().includes(normalizedQuery))
      .slice(0, 10)
      .map((game) => ({
        id: String(game.game_id),
        title: game.title,
        image: game.thumbnail_url || '',
        category: game.category || '',
      }));
  }, []);

  const resetSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsLoading(true);
      const searchResults = performSearch(debouncedQuery);
      setResults(searchResults);
      setIsLoading(false);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, performSearch]);

  return {
    query,
    results,
    isLoading,
    setQuery,
    resetSearch,
  };
};
