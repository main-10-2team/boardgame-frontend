'use client';

import { RiResetRightLine } from '@remixicon/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Radio from '../common/Radio';
import RangeSlider from '../common/RangeSlider';
import StarRating from '../common/StarRating';

const genreList = ['전략', '협동', '파티', '추리', '가족'];
const playerOptions = ['1명', '2명', '3명', '4명', '5명', '6명+'];
const ageGroups = ['전체', '8세+', '12세+'];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState<string[]>([]);
  const [players, setPlayers] = useState<string | null>(null);
  const [playTime, setPlayTime] = useState<number>(60);
  const [difficulty, setDifficulty] = useState<number>(0); // 1~5
  const [age, setAge] = useState<string>('전체');

  // 페이지 진입 시 쿼리 기반 초기값 설정
  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) setGenres(genreParam.split(','));

    const playersParam = searchParams.get('players');
    if (playersParam) setPlayers(playersParam);

    const timeParam = searchParams.get('time');
    if (timeParam) setPlayTime(Number(timeParam));

    const diffParam = searchParams.get('difficulty');
    if (diffParam) setDifficulty(Number(diffParam));

    const ageParam = searchParams.get('age');
    if (ageParam) setAge(ageParam);
  }, [searchParams]);

  const toggleGenre = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();

    if (genres.length) params.set('genre', genres.join(','));
    if (players) params.set('players', players);
    if (playTime) params.set('time', String(playTime));
    if (difficulty > 0) params.set('difficulty', String(difficulty));
    if (age) params.set('age', age);

    router.push(`/games?${params.toString()}`);
  };

  const handleReset = () => {
    setGenres([]);
    setPlayers(null);
    setPlayTime(60);
    setDifficulty(0);
    setAge('전체');
    router.push('/games');
  };

  return (
    <aside className="w-[238px] rounded-2xl border border-gray-200 px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">필터</h2>
        <Button
          variant="transparent"
          size="sm"
          onClick={handleReset}
          className="p-0! text-sm text-gray-500"
        >
          초기화 <RiResetRightLine className="inline-block w-4" />
        </Button>
      </div>

      {/* 장르 */}
      <section className="mb-6">
        <h3 className="mb-2 font-medium">장르</h3>
        <div className="flex flex-col gap-2">
          {genreList.map((g) => (
            <Checkbox
              key={g}
              checked={genres.includes(g)}
              onChange={() => toggleGenre(g)}
            >
              {g}
            </Checkbox>
          ))}
        </div>
      </section>

      {/* 인원수 */}
      <section className="mb-6">
        <h3 className="mb-2 font-medium">인원수</h3>
        <div className="grid grid-cols-3 gap-2">
          {playerOptions.map((p) => (
            <Button
              key={p}
              onClick={() => setPlayers(p)}
              className={`rounded border px-2! py-2! text-sm`}
              variant={players === p ? 'primary' : 'secondary'}
            >
              {p}
            </Button>
          ))}
        </div>
      </section>

      {/* 플레이 시간 */}
      <section className="mb-6">
        <h3 className="mb-2 font-medium">플레이 시간</h3>
        <RangeSlider
          min={15}
          max={120}
          step={5}
          value={playTime}
          onChange={setPlayTime}
        />
      </section>

      {/* 난이도 */}
      <section className="mb-6">
        <h3 className="mb-2 font-medium">난이도</h3>
        <StarRating value={difficulty} onChange={setDifficulty} />
      </section>

      {/* 연령대 */}
      <section className="mb-6">
        <h3 className="mb-2 font-medium">연령대</h3>
        <div className="flex flex-col gap-2">
          {ageGroups.map((a) => (
            <Radio key={a} checked={age === a} onChange={() => setAge(a)}>
              {a}
            </Radio>
          ))}
        </div>
      </section>

      {/* 검색 버튼 */}
      <Button
        onClick={handleSubmit}
        variant="primary"
        size="md"
        className="w-full"
      >
        검색
      </Button>
    </aside>
  );
}
