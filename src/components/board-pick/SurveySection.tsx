'use client';

import QuestionCard from '@/components/board-pick/QuestionCard';
import SurveyNav from '@/components/board-pick/SurveyNav';
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

export default function SurveySection({
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
    <div className="mx-auto flex max-w-[500px] flex-col gap-10 px-4 py-20 text-white">
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
