'use client';

import Button from '@/components/common/Button';
import { RiArrowRightLine } from '@remixicon/react';

export default function IntroSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 flex h-full flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-4xl font-bold">오늘의 게임은?</h1>
      <p className="mb-10 text-sm">
        상황에 맞게 오늘 플레이할 게임을 딱 정해드릴게요!
      </p>
      <Button
        variant="primary"
        size="md"
        className="flex items-center gap-2.5 px-6"
        onClick={onStart}
      >
        Start <RiArrowRightLine size={20} />
      </Button>
    </div>
  );
}
