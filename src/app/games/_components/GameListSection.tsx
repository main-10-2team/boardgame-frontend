import GameList from '@/components/game/GameList';
import { GameListItem } from '@/types/game/game';
import SortDropdown from './SortDropdown';

interface GameListSectionProps {
  total: number;
  gameListData: GameListItem[];
}
export default function GameListSection({
  total,
  gameListData,
}: GameListSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">총 {total}개</span>
        <SortDropdown />
      </div>

      {/* 카드 그리드 */}
      <GameList games={gameListData} columnNumber={3} imageRatio="1:1" />
    </section>
  );
}
