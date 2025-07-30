'use client';

import { Text } from '@visx/text';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { useEffect, useRef, useState } from 'react';

interface WordData {
  text: string;
  value: number;
  color: string;
  fontSize: number;
  fontWeight: string;
}

interface WordCloudProps {
  keywords: string[];
  popularKeywords: string[];
}

const FONT_SIZE = {
  bold: 28,
  normal: 16,
};

const COLORS = [
  'var(--color-primary-300)',
  'var(--color-primary-500)',
  'var(--color-primary-700)',
];

const HEIGHT = 200;
const WIDTH_CHANGE_THRESHOLD = 16;

export default function WordCloud({
  keywords,
  popularKeywords,
}: WordCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef<number>(0);
  const [width, setWidth] = useState<number | null>(null);

  // ResizeObserver로 반응형 처리
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const newWidth = Math.floor(containerRef.current.clientWidth);
      const widthDiff = Math.abs(newWidth - lastWidthRef.current);

      if (widthDiff >= WIDTH_CHANGE_THRESHOLD) {
        lastWidthRef.current = newWidth;
        setWidth(null);
        requestAnimationFrame(() => setWidth(newWidth));
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
      handleResize(); // 초기 실행
    }

    return () => observer.disconnect();
  }, []);

  // Word 데이터 가공
  const words: WordData[] = Array.from(new Set(keywords)).map((text) => {
    const isPopular = popularKeywords.includes(text);
    return {
      text,
      value: isPopular ? 2 : 1,
      color: isPopular
        ? COLORS[Math.floor(Math.random() * COLORS.length)]
        : '#1f1f1f',
      fontSize: isPopular ? FONT_SIZE.bold : FONT_SIZE.normal,
      fontWeight: isPopular ? '600' : '400',
    };
  });

  return (
    <div
      ref={containerRef}
      className="h-[200px] w-full max-w-full overflow-hidden"
    >
      {width !== null && (
        <Wordcloud
          key={width}
          words={words}
          width={width}
          height={HEIGHT}
          fontSize={(d) => d.fontSize}
          fontWeight={(d) => d.fontWeight}
          padding={4}
          spiral="archimedean"
          rotate={0}
        >
          {(cloudWords) =>
            cloudWords.map((w) => (
              <Text
                key={`${w.text}-${w.x}-${w.y}`}
                transform={`translate(${w.x}, ${w.y})`}
                fontSize={w.size}
                fontWeight={w.weight}
                fill={
                  words.find((word) => word.text === w.text)?.color ?? '#1f1f1f'
                }
                textAnchor="middle"
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      )}
    </div>
  );
}
