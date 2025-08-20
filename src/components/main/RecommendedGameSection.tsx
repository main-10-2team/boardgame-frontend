'use client';

import { useEffect, useState } from 'react';
import PreferenceSurveyCTA from '@/components/main/PreferenceSurveyCTA';
import RecommendedGameListWrapper from '@/components/main/RecommendedGameListWrapper';

interface User {
  nickname: string;
  name: string;
}

export default function RecommendedGameSection() {
  const [user, setUser] = useState<User | null>(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/user'), fetch('/api/recommended-games')])
      .then(([userRes, gamesRes]) => {
        return Promise.all([userRes.json(), gamesRes.json()]);
      })
      .then(([userData, gamesData]) => {
        setUser(userData);
        setGames(gamesData?.data || []);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setGames([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="inner">로딩중...</div>;
  }

  if (!user) {
    return (
      <div className="inner">
        <PreferenceSurveyCTA />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="inner">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          <span className="text-primary-400">{user.nickname}님</span>이 좋아하실
          만한 게임
        </h2>
        <RecommendedGameListWrapper games={games} />
      </div>
    </section>
  );
}
