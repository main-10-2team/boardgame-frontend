'use client';
import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';
import SearchOverlay from '@/components/common/SearchOverlay';

export function MobileSearchIcon() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <RiSearchLine
        onClick={() => setIsSearchOpen(true)}
        className="cursor-pointer"
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
