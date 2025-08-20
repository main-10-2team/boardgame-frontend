import { GameListResponse } from '@/types/game/game';
import { useQuery } from '@tanstack/react-query';
import SimilarGameItem from './SimilarGameItem';
interface SimilarGameListProps {
  genre: string;
}

export default function SimilarGameList({ genre }: SimilarGameListProps) {
  // const similarGames = await getSimilarGames(genre);
  const {
    data: similarGames,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['similar', genre],
    queryFn: async () => {
      const res = await fetch(`/api/games?genres=${genre}&page_size=4`);

      const data: GameListResponse = await res.json();
      return data.results;
    },
  });

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500">비슷한 게임을 불러오는 중...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-500">
        게임을 불러오는 중 오류가 발생했습니다.
      </p>
    );
  }
  if (!similarGames || similarGames.length === 0) {
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
