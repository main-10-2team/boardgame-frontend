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

const FONT_SIZE = {
  bold: 28,
  normal: 16,
};

const HEIGHT = 200;
const SPIRAL_STEP = 0.6;
const RADIUS_STEP = 5;
const MAX_ATTEMPTS = 500;

interface WordCloudProps {
  keywords: string[];
  popularKeywords: string[];
}

export default function WordCloud({
  keywords,
  popularKeywords,
}: WordCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seedRef = useRef(Math.floor(Math.random() * 10000)); // 랜덤 배치 시드 (SSR-safe)
  const [width, setWidth] = useState(0);
  const [positionedWords, setPositionedWords] = useState<WordPosition[]>([]);

  // ResizeObserver로 container width 감지
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    if (!containerRef.current) return;
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // popular 키워드에 색상 매핑
  const colorMap = useMemo(() => {
    const seed = seedRef.current;
    return new Map(
      popularKeywords.map((text, i) => [
        text,
        COLORS[(seed + i + text.length) % COLORS.length],
      ])
    );
  }, [popularKeywords]);

  // 키워드 → 스타일 적용된 Word[] 변환
  const words = useMemo<Word[]>(() => {
    return Array.from(new Set(keywords)).map((text) => {
      const isPopular = popularKeywords.includes(text);
      return {
        text,
        fontSize: isPopular ? FONT_SIZE.bold : FONT_SIZE.normal,
        fontWeight: isPopular ? '600' : '400',
        fill: isPopular ? colorMap.get(text)! : '#1f1f1f',
      };
    });
  }, [keywords, popularKeywords, colorMap]);

  // 화면 너비에 따라 폰트 크기 비율 조정
  const scaledWords = useMemo(() => {
    return scaleWordsToWidth(words, width);
  }, [words, width]);

  // 배치 좌표 계산 (클라이언트에서만 실행)
  useEffect(() => {
    if (!width) return;
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

  // 렌더링
  return (
    <div
      ref={containerRef}
      className="relative h-[200px] w-full overflow-visible"
    >
      <svg width={width} height={HEIGHT}>
        {positionedWords.map((word, i) => (
          <text
            key={`${word.text}-${i}`}
            x={word.x}
            y={word.y}
            fontSize={word.fontSize}
            fontWeight={word.fontWeight}
            fill={word.fill}
            textAnchor="middle"
            dominantBaseline="middle"
            className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:font-bold"
            style={{
              transformOrigin: 'center',
              transformBox: 'fill-box',
              pointerEvents: 'auto',
            }}
          >
            {word.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
