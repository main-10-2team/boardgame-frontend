'use client';

import { cn } from '@/utils/cn';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  current,
  total,
  className,
  showLabel = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(current, total));
  const percent = total > 0 ? (clamped / total) * 100 : 0;

  return (
    <div
      role="progressbar"
      aria-label="설문 진행도"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={clamped}
      className={cn('flex items-center gap-3', className)}
    >
      <div className="h-2 w-full overflow-hidden rounded-lg bg-gray-100">
        <div
          className="bg-primary-400 h-full rounded-full transition-[width] duration-300 ease-out"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
      {showLabel && (
        <span className="text-sm whitespace-nowrap">
          {clamped}/{total}
        </span>
      )}
    </div>
  );
}
