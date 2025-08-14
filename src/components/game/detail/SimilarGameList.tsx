import { fetcher } from '@/lib/fetcher';
import { GameListItem } from '@/types/game/game';
import SimilarGameItem from './SimilarGameItem';

interface SimilarGameListProps {
  genre: string;
}
interface GameListResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: GameListItem[];
}

async function getSimilarGames(genre = '전략') {
  const response = await fetcher<GameListResponse>(`/games/?genres=${genre}`);
  console.log('similar', response);
  return response.results;
}
export default async function SimilarGameList({ genre }: SimilarGameListProps) {
  const similarGames = await getSimilarGames(genre);

  if (similarGames.length === 0) {
    return <p className="text-sm text-gray-500">비슷한 게임이 없습니다.</p>;
  }
  return (
    <>
      {similarGames.map((item) => (
        <SimilarGameItem
          key={item.game_id}
          gameId={item.game_id}
          title={item.title}
          thumbnailUrl={item.thumbnail_url}
          averageRating={item.average_rating}
        />
      ))}
    </>
  );
}
