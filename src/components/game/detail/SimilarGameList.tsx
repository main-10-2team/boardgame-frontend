import { gameListData } from '@/assets/mocks/gameListData';
import { Game } from '@/types/game/game';
import SimilarGameItem from './SimilarGameItem';

interface SimilarGameListProps {
  game: Game;
}
export default function SimilarGameList({ game }: SimilarGameListProps) {
  const similarGames = gameListData.games
    .filter((g) => g.game_id !== game.game_id)
    .map((g) => ({
      game_id: g.game_id,
      title: g.title,
      image_url: g.image_url,
      average_rating: g.average_rating,
    }));
  if (similarGames.length === 0) {
    return <p className="text-sm text-gray-500">비슷한 게임이 없습니다.</p>;
  }
  return (
    <>
      {similarGames.map((item) => (
        <SimilarGameItem
          key={item.game_id}
          game_id={item.game_id}
          title={item.title}
          image_url={item.image_url}
          average_rating={item.average_rating}
        />
      ))}
    </>
  );
}
