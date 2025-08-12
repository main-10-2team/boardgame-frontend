'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { RiSearchLine, RiCloseLine } from '@remixicon/react';
import { useSearch } from '@/hooks/useSearch';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { query, results, isLoading, setQuery, resetSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      resetSearch();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, resetSearch]);

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
              placeholder="보드게임을 찾아보세요!"
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
              {results.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  onClick={onClose}
                >
                  <div className="flex cursor-pointer items-center gap-4 px-6 py-4 hover:bg-gray-50">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="h-12 w-12 rounded-lg bg-gray-200 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-gray-900">
                        {game.title}
                      </h3>
                      {game.category && (
                        <p className="mt-1 text-sm text-gray-500">
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
