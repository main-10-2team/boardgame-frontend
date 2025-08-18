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
    setIsLoading(true);

    const normalizedQuery = searchQuery.toLowerCase();
    try {
      const res = await fetch(
        `/api/games?keyword=${encodeURIComponent(normalizedQuery)}&page=1&page_size=6`
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data: GameListResponse = await res.json();
      const searchResults: SearchResult[] = data.results.map((game) => ({
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
