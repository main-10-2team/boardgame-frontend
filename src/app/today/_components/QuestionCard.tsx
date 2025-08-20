'use client';

import Checkbox from '@/components/common/Checkbox';
import Radio from '@/components/common/Radio';
import type { Question } from '@/types/board-pick/boardPick';

interface Props {
  question: Question;
  value: number | number[] | null;
  onSelectSingle: (optionId: number) => void;
  onToggleMulti: (optionId: number) => void;
}

export default function QuestionCard({
  question,
  value,
  onSelectSingle,
  onToggleMulti,
}: Props) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">{question.text}</h2>
      </div>

      {question.type === 'single-select' ? (
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => (
            <Radio
              key={opt.id}
              name={question.key}
              checked={value === opt.id}
              onToggle={() => onSelectSingle(opt.id)}
            >
              <span className="text-sm">{opt.label}</span>
            </Radio>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {question.options.map((opt) => {
            const arr = Array.isArray(value) ? (value as number[]) : [];
            const checked = arr.includes(opt.id);
            return (
              <Checkbox
                key={opt.id}
                checked={checked}
                onToggle={() => onToggleMulti(opt.id)}
              >
                <span className="text-sm">{opt.label}</span>
              </Checkbox>
            );
          })}
        </div>
      )}
    </div>
  );
}
