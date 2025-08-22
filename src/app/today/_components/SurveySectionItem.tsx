'use client';

import QuestionCard from '@/app/today/_components/QuestionCard';
import SurveyNav from '@/app/today/_components/SurveyNav';
import ProgressBar from '@/components/common/ProgressBar';
import type { Question } from '@/types/board-pick/boardPick';

interface SurveySectionProps {
  step: number;
  total: number;
  question: Question;
  value: number | number[] | null;
  onSelectSingle: (id: number) => void;
  onToggleMulti: (id: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
}

export default function SurveySectionItem({
  step,
  total,
  question,
  value,
  onSelectSingle,
  onToggleMulti,
  onPrev,
  onNext,
  canNext,
}: SurveySectionProps) {
  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col gap-10 px-4 py-20 text-white">
      <ProgressBar current={step} total={total} />
      <QuestionCard
        question={question}
        value={value}
        onSelectSingle={onSelectSingle}
        onToggleMulti={onToggleMulti}
      />
      <SurveyNav
        isFirst={step === 1}
        isLast={step === total}
        onPrev={onPrev}
        onNext={onNext}
        canNext={canNext}
      />
    </div>
  );
}
