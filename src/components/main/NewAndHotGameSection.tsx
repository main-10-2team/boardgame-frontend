import { gameListData } from '@/assets/mocks/gameListData';
import { RiArrowRightLine } from '@remixicon/react';
import Link from 'next/link';
import RankItemList from './RankItemList';

export default function NewAndHotGameSection() {
  const games = gameListData.games.slice(0, 3);
  return (
    <div className="inner">
      <h2 className="mb-8 flex items-center justify-between text-2xl font-bold md:text-3xl">
        NEW & HOT
        <Link
          href="/rank"
          className="group flex items-center gap-1 p-1 text-sm text-gray-900 hover:underline"
        >
          전체보기
          <RiArrowRightLine className="w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
        <RankItemList games={games} title="NEW" />
        <RankItemList games={games} title="HOT" />
      </div>
    </div>
  );
}
