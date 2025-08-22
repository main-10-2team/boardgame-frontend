'use client';

import {
  assignSpiralPositions,
  scaleWordsToWidth,
  type Word,
  type WordPosition,
} from '@/utils/positionUtils';
import { useEffect, useMemo, useRef, useState } from 'react';

const COLORS = [
  'var(--color-primary-300)',
  'var(--color-primary-500)',
  'var(--color-primary-700)',
];
const FONT_SIZE = { bold: 28, normal: 16 };
const HEIGHT = 200;
const SPIRAL_STEP = 0.6;
const RADIUS_STEP = 5;
const MAX_ATTEMPTS = 500;
const CAP = 20; // 최대 렌더링 개수
const TOP_HIGHLIGHT = 3; // 강조 개수(Top3)

type WordCloudProps = {
  /** 서버 popular_genres (정렬 가정) */
  popularKeywords: string[];
};

function buildCappedKeywords(input: string[], cap: number) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of input) {
    const k = (raw ?? '').trim();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
    if (out.length >= cap) break;
  }
  return out;
}

function pickTopN(popular: string[], n: number) {
  return (popular ?? [])
    .map((s) => (s ?? '').trim())
    .filter(Boolean)
    .slice(0, n);
}

function makeColorMap(keys: string[], seed: number) {
  const map = new Map<string, string>();
  keys.forEach((text, i) =>
    map.set(text, COLORS[(seed + i + text.length) % COLORS.length])
  );
  return map;
}

export default function WordCloud({ popularKeywords }: WordCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seedRef = useRef(Math.floor(Math.random() * 10000)); // SSR-safe 시드

  const [width, setWidth] = useState(0);
  const [positionedWords, setPositionedWords] = useState<WordPosition[]>([]);

  // 컨테이너 width 감지
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width))
    );
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // 전체 렌더 목록(최대 20개)
  const all = useMemo(
    () => buildCappedKeywords(popularKeywords ?? [], CAP),
    [popularKeywords]
  );

  // Top3 강조 세트 + 색상
  const top3 = useMemo(
    () => pickTopN(popularKeywords ?? [], TOP_HIGHLIGHT),
    [popularKeywords]
  );
  const highlightSet = useMemo(() => new Set(top3), [top3]);
  const colorMap = useMemo(() => makeColorMap(top3, seedRef.current), [top3]);

  // 전체 words 생성(Top3만 강조)
  const words = useMemo<Word[]>(
    () =>
      all.map((text) => {
        const isHot = highlightSet.has(text);
        return {
          text,
          fontSize: isHot ? FONT_SIZE.bold : FONT_SIZE.normal,
          fontWeight: isHot ? '600' : '400',
          fill: isHot ? (colorMap.get(text) ?? COLORS[0]) : '#1f1f1f',
        };
      }),
    [all, highlightSet, colorMap]
  );

  // width 기반 폰트 스케일
  const scaledWords = useMemo(
    () => scaleWordsToWidth(words, width),
    [words, width]
  );

  // 위치 배치
  useEffect(() => {
    if (!width || scaledWords.length === 0) {
      setPositionedWords([]);
      return;
    }
    const positioned = assignSpiralPositions(
      scaledWords,
      width,
      HEIGHT,
      seedRef.current,
      SPIRAL_STEP,
      RADIUS_STEP,
      MAX_ATTEMPTS
    );
    setPositionedWords(positioned);
  }, [scaledWords, width]);

  // 빈 상태
  if (all.length === 0) {
    return (
      <div
        ref={containerRef}
        className="flex h-[200px] w-full items-center justify-center text-gray-700"
      >
        아직 취향 키워드가 없어요.
        <a href="/preference" className="text-primary-500 ml-1 underline">
          취향 조사
        </a>
        를 진행해보세요!
      </div>
    );
  }

  // 렌더
  return (
    <div
      ref={containerRef}
      className="relative h-[200px] w-full overflow-visible"
    >
      <svg width={width} height={HEIGHT}>
        {positionedWords.map((w, i) => (
          <text
            key={`${w.text}-${i}`}
            x={w.x}
            y={w.y}
            fontSize={w.fontSize}
            fontWeight={w.fontWeight}
            fill={w.fill}
            textAnchor="middle"
            dominantBaseline="middle"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:font-bold"
            style={{
              transformOrigin: 'center',
              transformBox: 'fill-box',
              pointerEvents: 'auto',
            }}
          >
            {w.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
