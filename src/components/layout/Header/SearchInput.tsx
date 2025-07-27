import SearchIcon from '@/assets/icons/search.svg';
import Icon from '@/components/common/Icon';

export function SearchInput() {
  return (
    <div className="relative w-full max-w-xs">
      {/* 아이콘 */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Icon icon={SearchIcon} size={24} className="text-gray-500" />
      </div>

      {/* input */}
      <input
        type="text"
        placeholder="보드게임을 찾아보세요!"
        className="w-full bg-gray-200 rounded-2xl pl-12 pr-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}
