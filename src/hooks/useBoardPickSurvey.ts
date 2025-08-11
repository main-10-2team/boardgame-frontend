'use client';

import type { AnswerMap, Question } from '@/types/board-pick/boardPick';
import { isAnswered, makeInitialAnswers } from '@/utils/boardPick';
import { useMemo, useState } from 'react';

export type Phase = 'intro' | 'survey' | 'done';

export function useBoardPickSurvey(questions: Question[]) {
  const items = useMemo(() => questions.slice(), [questions]);
  const total = items.length;

  const [phase, setPhase] = useState<Phase>('intro');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>(() =>
    makeInitialAnswers(items)
  );

  const current = items[idx] ?? null;
  const step = idx + 1;

  const setSingle = (key: string, optionId: number) =>
    setAnswers((prev) => ({ ...prev, [key]: optionId }));

  const toggleMulti = (key: string, optionId: number) =>
    setAnswers((prev) => {
      const arr = Array.isArray(prev[key]) ? (prev[key] as number[]) : [];
      const next = arr.includes(optionId)
        ? arr.filter((v) => v !== optionId)
        : [...arr, optionId];
      return { ...prev, [key]: next };
    });

  const canNext =
    phase !== 'survey' ||
    (current ? isAnswered(current, answers[current.key]) : false);

  return {
    phase,
    start: () => setPhase('survey'),
    done: () => setPhase('done'),

    step,
    total,
    current,
    answers,

    setSingle,
    toggleMulti,

    canNext,
    goNext: () => {
      if (phase !== 'survey') return;
      if (idx < total - 1) setIdx((i) => i + 1);
      else setPhase('done');
    },
    goPrev: () => {
      if (phase !== 'survey') return;
      if (idx > 0) setIdx((i) => i - 1);
    },
  };
}
