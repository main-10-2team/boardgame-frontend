'use client';

import { Game } from '@/types/game/game';
import { Result } from '@/types/preference/result';
import ResultCard from './ResultCard';
import SimilarGameSection from './SimilarGameSection';

interface BoardPickResultProps {
  result: Result[];
  similar: Game[];
}

export default function BoardPickResult({
  result,
  similar,
}: BoardPickResultProps) {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden">
        <div
          className="relative pt-16 pb-8 md:pb-12"
          style={{
            background: `url('/images/bg_preferResult01.png') no-repeat center center / cover`,
          }}
        >
          <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            오늘의 게임은?
          </h1>
          <p className="mb-8 text-center text-sm text-gray-600 md:mb-14">
            설문을 바탕으로 뽑은 오늘의 추천게임이에요!
          </p>
          <div className="inner">
            <ResultCard data={result[0]} />
          </div>
        </div>
      </section>

      <section className="bg-[#EDD56C] py-8 md:py-12">
        <div className="inner">
          <ResultCard data={result[1]} variant="soft" align="right" />
        </div>
      </section>
      <section
        className="py-8 md:py-12"
        style={{
          background: `url('/images/bg_preferResult02.png') no-repeat center center / cover`,
        }}
      >
        <div className="inner">
          <ResultCard data={result[2]} />
        </div>
      </section>

      <SimilarGameSection similar={similar} />
    </div>
  );
}
