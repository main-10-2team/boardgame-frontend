import { GameDetail } from '@/types/game/game';
import { notFound } from 'next/navigation';
import GameDetailBottomSection from './GameDetailBottomSection';
import GameDetailPageHeader from './GameDetailPageHeader';
import GameDetailTopSection from './GameDetailTopSection';

interface GameDetailPageProps {
  game: GameDetail;
  //   game: any;
}

export default function GameDetailUI({ game }: GameDetailPageProps) {
  if (!game) {
    notFound();
  }

  return (
    <div className="inner pt-6 pb-40">
      <GameDetailPageHeader title={game.title} gameId={game.game_id} />
      {/* 게임 상세 상단 */}
      <GameDetailTopSection game={game} />

      {/* 게임 상세(하단) */}
      <GameDetailBottomSection game={game} />
    </div>
  );
}
