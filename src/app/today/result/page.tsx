import BoardPickResult from '@/components/preference/result/BoardPickResult';
import { fetcher } from '@/lib/fetcher';
import { GameListItem, GameListResponse } from '@/types/game/game';

async function getGameListData() {
  const res = await fetcher<GameListResponse>(`/games/?limit=6`);

  const [first, second, third, ...rest] = res.results;

  const result = [first, second, third].map((game) => ({
    game_id: game.game_id,
    title: game.title,
    difficulty: game.difficulty,
    thumbnail_url: game.thumbnail_url,
    average_rating: game.average_rating,
    like_count: game.like_count,
    genre: game.genre,
    category: game.category,
    // quote: game.quote,
    // reviewer: game.reviewer,
    // description: game.description,
    quote: '리뷰내용',
    reviewer: '리뷰어명',
    description: '게임 설명',
  }));

  const similar: GameListItem[] = rest.map((game) => ({
    game_id: game.game_id,
    title: game.title,
    difficulty: game.difficulty.toString(),
    thumbnail_url: game.thumbnail_url,
    average_rating: game.average_rating,
    like_count: game.like_count,
    genre: game.genre,
    category: game.category,
    age: 0,
    description: '',
    min_players: 0,
    max_players: 0,
    playtime_min_minutes: 0,
    playtime_max_minutes: 0,
    rules_url: '',
    updated_at: '',
    is_liked: false,
    reviews_count: 0,
  }));
  return { result, similar };
}

export default async function ResultPage() {
  const { result, similar } = await getGameListData();
  // const [first, second, third, ...similar] = gameListData;
  return <BoardPickResult result={result} similar={similar} />;
}
