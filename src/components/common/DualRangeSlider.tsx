'use client';

import { useEffect, useRef, useState } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  onChange: (values: { min: number; max: number }) => void;
  unit?: string;
}

export default function DualRangeSlider({
  min,
  max,
  step = 1,
  initialMin = min,
  initialMax = max,
  onChange,
  unit,
}: DualRangeSliderProps) {
  const [currentMin, setCurrentMin] = useState(initialMin);
  const [currentMax, setCurrentMax] = useState(initialMax);
  const sliderRef = useRef<HTMLDivElement>(null);

  // useEffect를 사용하여 부모 컴포넌트의 prop이 변경될 때 상태 업데이트
  useEffect(() => {
    setCurrentMin(initialMin);
    setCurrentMax(initialMax);
  }, [initialMin, initialMax]);

  // 현재 값과 전체 범위에 따른 퍼센트 계산
  const minPercent = ((currentMin - min) / (max - min)) * 100;
  const maxPercent = ((currentMax - min) / (max - min)) * 100;

  // 핸들 드래그 이벤트
  const startDrag = (e: React.MouseEvent, type: 'min' | 'max') => {
    e.preventDefault();
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = moveEvent.clientX;
      const newValue = ((clientX - rect.left) / rect.width) * (max - min) + min;
      const roundedValue = Math.round(newValue / step) * step;

      if (type === 'min') {
        const newMin = Math.min(Math.max(min, roundedValue), currentMax - step);
        setCurrentMin(newMin);
        onChange({ min: newMin, max: currentMax });
      } else {
        const newMax = Math.max(Math.min(max, roundedValue), currentMin + step);
        setCurrentMax(newMax);
        onChange({ min: currentMin, max: newMax });
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="w-full">
      <div ref={sliderRef} className="relative mb-2 h-2 rounded-lg">
        {/* 전체 배경 바 */}
        <div className="absolute inset-y-0 z-0 h-full w-full rounded-lg bg-gray-100" />

        {/* 채워진 레인지 바 */}
        <div
          className="bg-primary-400 absolute inset-y-0 z-10 h-full rounded-lg"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
            backgroundColor: '#ff61d5',
          }}
        />

        {/* 최소값 핸들 */}
        <span
          className="bg-primary-400 absolute top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full shadow-md"
          style={{ left: `${minPercent}%` }}
          onMouseDown={(e) => startDrag(e, 'min')}
        >
          <span className="text-primary-400 absolute -bottom-full left-1/2 -translate-x-1/2 text-xs font-medium text-nowrap">
            {currentMin}
          </span>
        </span>
        {/* 최대값 핸들 */}
        <span
          className="bg-primary-400 absolute top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full shadow-md"
          style={{ left: `${maxPercent}%` }}
          onMouseDown={(e) => startDrag(e, 'max')}
        >
          <span className="text-primary-400 absolute -bottom-full left-1/2 -translate-x-1/2 text-xs font-medium text-nowrap">
            {currentMax}
          </span>
        </span>
      </div>
      {/* 현재 값 표시 */}
      <div className="mt-6 flex w-full items-center justify-between">
        <span className="text-xs font-medium text-nowrap text-black">
          {`${min}`}
        </span>
        <span className="text-xs font-medium text-nowrap text-black">
          {`${max}${unit ? `(${unit})` : ''}`}
        </span>
      </div>
    </div>
  );
}
