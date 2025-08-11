'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { RiSearchLine, RiCloseLine } from '@remixicon/react';
import { cn } from '@/utils/cn';
import { gameListData } from '@/assets/mocks/gameListData';

interface SearchResult {
  id: string;
  title: string;
  image: string;
  category: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_DEBOUNCE_DELAY = 300;
const SEARCH_PLACEHOLDER = '보드게임을 찾아보세요!';

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  // 열릴 때 초기화
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // 디바운스 검색
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim() !== '') {
        setIsLoading(true); // 검색 시작 시 로딩 상태로 변경
        // 목데이터 → SearchResult[] 변환
        const searchResults: SearchResult[] = gameListData.games
          .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()))
          .map((g) => ({
            id: String(g.game_id),
            title: g.title,
            image: g.thumbnail_url ?? '',
            category: g.genre_name ?? '',
          }));

        setResults(searchResults);
        setIsLoading(false); // 검색 완료 후 로딩 상태 해제
      } else {
        setResults([]);
      }

      setSelectedIndex(-1);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Link 컴포넌트를 사용하므로 이 함수는 더 이상 필요 없습니다.
  // const handleResultClick = (result: SearchResult) => { ... };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-0"
      onClick={handleBackdropClick}
    >
      <div className="mt-0 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-gray-100 p-6">
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <RiSearchLine size={20} color="#9EA5AD" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={SEARCH_PLACEHOLDER}
              className="w-full rounded-2xl bg-gray-100 py-4 pr-16 pl-12 text-base placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />

            <button
              onClick={onClose}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
            >
              <RiCloseLine size={20} color="#9EA5AD" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <span className="ml-2 text-gray-600">검색 중...</span>
            </div>
          ) : query && results.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={`/games/${result.id}`}
                  onClick={onClose}
                >
                  <div
                    className={cn(
                      'flex cursor-pointer items-center gap-4 px-6 py-4',
                      selectedIndex === index
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    )}
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      className="h-12 w-12 rounded-lg bg-gray-200 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-gray-900">
                        {result.title}
                      </h3>
                      {result.category && (
                        <p className="mt-1 text-sm text-gray-500">
                          {result.category}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query === '' ? (
            <div className="flex items-center justify-center py-8 text-gray-400">
              검색어를 입력해주세요.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
