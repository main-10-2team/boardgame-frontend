'use client';

import Accordion from '@/components/common/Accordian';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Radio from '@/components/common/Radio';
import RangeSlider from '@/components/common/RangeSlider';
import {
  ageGroups,
  categoryList,
  difficultyLevels,
  genreList,
  playerOptions,
} from '@/constants/games/filter';
import { RiResetRightLine } from '@remixicon/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [players, setPlayers] = useState<string | null>(null);
  const [playTime, setPlayTime] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>(''); // 1~5
  const [age, setAge] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>('');

  // 페이지 진입 시 쿼리 기반 초기값 설정
  useEffect(() => {
    const categoryParam = searchParams.get('categories');
    if (categoryParam) setCategories(categoryParam.split(','));

    const genreParam = searchParams.get('genres');
    if (genreParam) setGenres(genreParam.split(','));

    const playersParam = searchParams.get('players');
    if (playersParam) setPlayers(playersParam);

    const timeParam = searchParams.get('playtime_min_minutes');
    if (timeParam) setPlayTime(Number(timeParam));

    const diffParam = searchParams.get('difficulty');
    if (diffParam) setDifficulty(diffParam);

    const ageParam = searchParams.get('age');
    if (ageParam) setAge(Number(ageParam));

    const keywordParam = searchParams.get('keyword');
    if (keywordParam) setKeyword(keywordParam);
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleGenre = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();

    if (categories.length) params.set('categories', categories.join(','));
    if (genres.length) params.set('genres', genres.join(','));
    if (players) params.set('players', players);
    if (playTime > 0) params.set('playtime_min_minutes', String(playTime));
    if (difficulty && difficulty !== '0')
      params.set('difficulty', String(difficulty));
    if (age !== null) params.set('age', String(age));
    if (keyword) params.set('keyword', keyword);

    router.push(`/games?${params.toString()}`);
  };

  const handleReset = () => {
    setCategories([]);
    setGenres([]);
    setPlayers(null);
    setPlayTime(0);
    setDifficulty('');
    setAge(null);
    setKeyword('');
    router.push('/games');
  };

  return (
    <aside className="w-full rounded-2xl border border-gray-200 px-4 py-6">
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

      <div className="space-y-6">
        <Accordion title="카테고리" open={false}>
          <div className="flex flex-col gap-2">
            {categoryList.map((c) => (
              <Checkbox
                key={c}
                checked={categories.includes(c)}
                onChange={() => toggleCategory(c)}
              >
                {c}
              </Checkbox>
            ))}
          </div>
        </Accordion>

        {/* 장르 */}
        <Accordion title="장르" open={false}>
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
        </Accordion>

        <Accordion title="인원수">
          <div className="grid grid-cols-3 gap-2 pb-1">
            {playerOptions.map((p) => (
              <Button
                key={p.value}
                onClick={() => setPlayers(String(p.value))}
                className={`rounded border px-2! py-2! text-sm`}
                variant={players === String(p.value) ? 'primary' : 'secondary'}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </Accordion>

        <Accordion title="연령대">
          <div className="flex flex-col gap-2">
            {ageGroups.map((a) => (
              <Radio
                key={a.label}
                checked={age === a.value}
                onChange={() => setAge(a.value)}
              >
                {a.label}
              </Radio>
            ))}
          </div>
        </Accordion>

        <div>
          <h3 className="mb-2 font-medium">최소 플레이 시간</h3>
          <RangeSlider
            min={15}
            max={120}
            unit="분"
            step={5}
            value={playTime}
            onChange={setPlayTime}
          />
        </div>

        <div>
          <h3 className="mb-2 font-medium">난이도</h3>
          <div className="grid grid-cols-3 gap-2">
            {difficultyLevels.map((level) => (
              <Button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`rounded border px-2! py-2! text-sm`}
                variant={difficulty === level ? 'primary' : 'secondary'}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          variant="primary"
          size="md"
          className="w-full"
        >
          검색
        </Button>
      </div>
    </aside>
  );
}
