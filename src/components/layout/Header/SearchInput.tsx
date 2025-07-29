import { RiSearchLine } from '@remixicon/react';

export function SearchInput() {
  return (
    <div className="relative w-full max-w-xs">
      {/* 아이콘 */}
      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <RiSearchLine color="#9EA5AD" />
      </div>

      {/* input */}
      <input
        type="text"
        placeholder="보드게임을 찾아보세요!"
        className="w-full rounded-2xl bg-gray-200 py-2 pr-4 pl-12 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
      />
    </div>
  );
}
