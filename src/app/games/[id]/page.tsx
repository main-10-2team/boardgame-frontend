'use client';
import { gameListData } from '@/assets/mocks/gameListData';
import LikeButton from '@/components/game/LikeButton';

import GameDetailInfo from '@/components/game/detail/GameDetailInfo';
import GameReviewSection from '@/components/game/detail/GameReviewSection';
import GameThumbnailSection from '@/components/game/detail/GameThumbnailSection';
import SimilarGameList from '@/components/game/detail/SimilarGameList';
import YoutubeVideoSection from '@/components/game/detail/YoutubeVideoSection';
import GameTags from '@/components/game/GameTags';
import Grid from '@/components/layout/Grid';
import { Game } from '@/types/game/game';
import dynamic from 'next/dynamic';
import { use, useEffect, useState } from 'react';

const Breadcrumbs = dynamic(() => import('@/components/layout/Breadcrumbs'), {
  ssr: false,
});

interface GameDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const [game, setGame] = useState<Game>();
  const { id } = use(params);

  useEffect(() => {
    setGame(gameListData.games.find((game) => game.game_id === parseInt(id)));
  }, [game, id]);

  if (!game) {
    return <div>게임 정보를 불러오는 중...</div>;
  }

  return (
    <div className="inner pt-6 pb-40">
      <Breadcrumbs />
      <h1 className="mt-4 mb-6 flex items-center gap-2 text-2xl font-bold md:mt-6 md:mb-12 md:text-4xl">
        {game.title}
        <LikeButton
          liked={false}
          gameId={0}
          className="relative"
          lineColor="text-gray-300"
        />
      </h1>
      {/* 게임 상세 상단 */}
      <Grid className="mb-8 space-y-8 md:space-y-0 lg:mb-20">
        <Grid.Item span="col-span-8 md:col-span-4 lg:col-span-4">
          <GameThumbnailSection
            image_url={game.image_url}
            like_count={game.like_count}
            average_rating={game.average_rating}
          />
        </Grid.Item>

        {/* 우측 콘텐츠 */}
        <Grid.Item span="col-span-8 md:col-span-8 lg:col-span-8 h-full">
          <div className="game-detail-section h-full">
            <h2 className="game-detail-title">{game.title}</h2>
            <p className="mb-6 text-gray-700">{game.description}</p>
            <div className="flex flex-wrap gap-2">
              <GameTags
                genre_name={game.genre_name}
                min_players={game.min_players}
                max_players={game.max_players}
                difficulty={game.difficulty}
                isLink={true}
                size="md"
              />
            </div>
          </div>
        </Grid.Item>
      </Grid>

      {/* 게임 상세(하단) */}
      <Grid>
        <Grid.Item
          span="col-span-8 md:col-span-12 lg:col-span-8"
          className="order-2 space-y-8 lg:order-1"
        >
          <div className="game-detail-section">
            <h2 className="game-detail-title">게임 설명 & 규칙 영상</h2>
            <YoutubeVideoSection gameTitle={game.title} />
          </div>
          <div className="game-detail-section">
            <GameReviewSection
              gameId={game.game_id}
              gameTitle={game.title}
              imageUrl={game.image_url}
            />
          </div>
        </Grid.Item>
        <Grid.Item
          span="col-span-8 md:col-span-12 lg:col-span-4"
          className="order-1 space-y-8 lg:order-2"
        >
          <div className="game-detail-section">
            <h2 className="game-detail-title">게임 정보</h2>
            <GameDetailInfo game={game} />
          </div>
          <div className="game-detail-section">
            <h2 className="game-detail-title">비슷한 게임</h2>
            <div className="space-y-6">
              <SimilarGameList game={game} />
            </div>
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
}
