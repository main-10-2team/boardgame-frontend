'use client';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

export default function SurveyNav({
  isFirst,
  isLast,
  onPrev,
  onNext,
  canNext,
}: {
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-x-6">
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={isFirst}
        className={cn(
          'w-full',
          isFirst && 'cursor-not-allowed opacity-60 ring-1 ring-gray-200'
        )}
      >
        이전
      </Button>
      <Button
        variant="primary"
        onClick={onNext}
        disabled={!canNext}
        className={cn(
          'w-full',
          !canNext && 'cursor-not-allowed opacity-60 grayscale'
        )}
      >
        {isLast ? '결과 보기' : '다음'}
      </Button>
    </div>
  );
}
