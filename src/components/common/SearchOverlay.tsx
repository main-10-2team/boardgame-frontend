'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiSearchLine, RiCloseLine } from '@remixicon/react';
import { useSearch } from '@/hooks/useSearch';
import { useEscapeKey } from '@/hooks/useEscapeKey';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const { query, results, isLoading, setQuery, resetSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEscapeKey(isOpen ? onClose : () => {});

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isOpen) {
      resetSearch();
      inputRef.current?.focus();

      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleResultClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-20"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      <div className="animate-in fade-in-0 slide-in-from-top-4 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl duration-200">
        <div className="border-b border-gray-100 p-6">
          <div className="relative">
            <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
              <RiSearchLine size={20} className="text-gray-400" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="보드게임을 찾아보세요!"
              className="w-full rounded-2xl bg-gray-100 py-4 pr-16 pl-12 text-base transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
              aria-label="보드게임 검색"
              autoComplete="off"
              spellCheck="false"
            />

            <button
              onClick={onClose}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              aria-label="검색 닫기"
              type="button"
            >
              <RiCloseLine size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div
              className="flex items-center justify-center py-8"
              role="status"
              aria-live="polite"
            >
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <span className="ml-2 text-gray-600">검색 중...</span>
            </div>
          ) : query && results.length === 0 ? (
            <div
              className="flex items-center justify-center py-8 text-gray-500"
              role="status"
            >
              검색 결과가 없습니다.
            </div>
          ) : results.length > 0 ? (
            <div className="py-2" role="listbox" aria-label="검색 결과">
              {results.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  onClick={handleResultClick}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-inset"
                  role="option"
                  tabIndex={0}
                >
                  <div className="flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-gray-50">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={game.image}
                        alt=""
                        fill
                        className="rounded-lg bg-gray-200 object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-gray-900">
                        {game.title}
                      </h3>
                      {game.category && (
                        <p className="mt-1 truncate text-sm text-gray-500">
                          {game.category}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 text-gray-400">
              검색어를 입력해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
