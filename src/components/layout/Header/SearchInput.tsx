'use client';

import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';
import SearchOverlay from '@/components/common/SearchOverlay';

export function SearchInput() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <div
        className="relative w-full max-w-xs cursor-pointer"
        onClick={handleOpenSearch}
      >
        <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
          <RiSearchLine size={16} color="#9EA5AD" />
        </div>

        <div className="flex h-9 w-full items-center rounded-2xl border border-gray-200 bg-gray-100 py-1 pr-3 pl-10 text-sm text-gray-400">
          보드게임을 찾아보세요!
        </div>
      </div>

      {/* SearchOverlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        // onSearch={handleSearch} // 나중에 API 연결시 추가
      />
    </>
  );
}
