'use client';

import { RiStarFill } from '@remixicon/react';
import { useRef, useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value;
  const starRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // 클릭 위치에 따라 0.5 or 1점 계산
  const getClickValue = (e: React.MouseEvent, index: number): number => {
    const target = starRefs.current[index];
    if (!target) return value;

    const { left, width } = target.getBoundingClientRect();
    const clickX = e.clientX - left;
    const ratio = clickX / width;

    return ratio >= 0.7 ? index + 1 : index + 0.5;
  };
  const handleMove = (e: React.MouseEvent, index: number) => {
    const next = getClickValue(e, index);
    setHoverValue(next);
  };

  const handleClick = (e: React.MouseEvent, index: number) => {
    const next = getClickValue(e, index);
    onChange(next);
    console.log(`별점 ${next}점으로 설정됨`);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const index = i;
        const full = displayValue >= index + 1;
        const half = displayValue === index + 0.5;

        return (
          <span
            key={index}
            ref={(el) => {
              starRefs.current[index] = el;
            }}
            className="relative min-h-[24px] min-w-[24px] cursor-pointer p-1 select-none"
            onClick={(e) => handleClick(e, index)}
            onMouseMove={(e) => handleMove(e, index)}
            onMouseLeave={() => setHoverValue(null)}
          >
            {/* 회색 배경 별 */}
            <span className="absolute top-0 left-0 text-gray-300">
              <RiStarFill />
            </span>

            {/* 전체 별 */}
            {full && (
              <span className="text-primary-500 absolute top-0 left-0">
                <RiStarFill />
              </span>
            )}

            {/* 반 별 */}
            {half && (
              <span className="text-primary-500 absolute top-0 left-0 w-[52%] overflow-hidden">
                <RiStarFill />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
