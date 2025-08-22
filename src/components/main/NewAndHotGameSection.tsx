import { RiArrowRightLine } from '@remixicon/react';
import Link from 'next/link';
import RankItemList from './RankItemList';
import { fetcher } from '@/lib/fetcher';
import { GameListItem } from '@/types/game/game';

interface RankingApiResponse {
  top_by_like: Array<{
    game_id: number;
    thumbnail_url: string;
    title: string;
    description: string | null;
    like_count: number;
    average_rating: number;
    genre: string;
    category: string;
    difficulty: string;
  }>;
  top_by_rating: Array<{
    game_id: number;
    thumbnail_url: string;
    title: string;
    description: string | null;
    like_count: number;
    average_rating: number;
    genre: string;
    category: string;
    difficulty: string;
  }>;
}

export default async function NewAndHotGameSection() {
  try {
    const response = await fetcher<RankingApiResponse>('/games/ranking/');

    // API 데이터를 GameListItem 형식으로 변환
    const popularGames: (GameListItem & { description?: string })[] = (
      response.top_by_like || []
    ).map((game) => ({
      game_id: game.game_id,
      title: game.title,
      thumbnail_url: game.thumbnail_url,
      difficulty: game.difficulty,
      like_count: game.like_count,
      average_rating: game.average_rating,
      reviews_count: 0, // API에 없으니 기본값
      genre: game.genre,
      category: game.category,
      is_liked: false, // API에 없으니 기본값
      description: game.description || undefined,
    }));

    const ratingGames: (GameListItem & { description?: string })[] = (
      response.top_by_rating || []
    ).map((game) => ({
      game_id: game.game_id,
      title: game.title,
      thumbnail_url: game.thumbnail_url,
      difficulty: game.difficulty,
      like_count: game.like_count,
      average_rating: game.average_rating,
      reviews_count: 0,
      genre: game.genre,
      category: game.category,
      is_liked: false,
      description: game.description || undefined,
    }));

    return (
      <div className="inner">
        <h2 className="mb-8 flex items-center justify-between text-2xl font-bold md:text-3xl">
          보드큐 랭킹
          <Link
            href="/ranking"
            className="group flex items-center gap-1 p-1 text-sm text-gray-900 hover:underline"
          >
            전체보기
            <RiArrowRightLine className="w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </h2>
        <div className="grid grid-cols-1 gap-15 md:grid-cols-2 md:gap-6">
          <RankItemList games={popularGames} title="전체" />
          <RankItemList games={ratingGames} title="평점순" />
        </div>
      </div>
    );
  } catch (error) {
    return <div className="inner">랭킹 데이터를 불러오는데 실패했습니다.</div>;
  }
}
