import { RiSearchLine } from '@remixicon/react';

export function SearchInput() {
  return (
    <div className="relative w-full max-w-xs">
      {/* 아이콘 */}
      <div className="absolute -translate-y-1/2 left-3 top-1/2">
        <RiSearchLine color="#9EA5AD" />
      </div>

      {/* input */}
      <input
        type="text"
        placeholder="보드게임을 찾아보세요!"
        className="w-full py-2 pl-12 pr-4 text-sm bg-gray-200 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}
