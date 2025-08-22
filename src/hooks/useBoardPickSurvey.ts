'use client';

import type { AnswerMap, Question } from '@/types/board-pick/boardPick';
import { useCallback, useState } from 'react';

export type Phase = 'intro' | 'survey';
const TOTAL_STEPS = 5;

export function useBoardPickSurvey() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [questionsByKey, setQuestionsByKey] = useState<
    Record<string, Question>
  >({});
  const rememberQuestion = useCallback((q: Question) => {
    setQuestionsByKey((prev) => (prev[q.key] ? prev : { ...prev, [q.key]: q }));
  }, []);

  // 설문 시작 → 1번 질문
  const start = useCallback(() => {
    setPhase('survey');
    setStep(1);
  }, []);

  // 설문 초기화
  const reset = useCallback(() => {
    setPhase('intro');
    setStep(1);
    setAnswers({});
    setQuestionsByKey({});
  }, []);

  // 단일 선택형 답변 설정
  const setSingle = useCallback((key: string, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [key]: optionId }));
  }, []);

  // 다중 선택형 답변 토글
  const toggleMulti = useCallback((key: string, id: number) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[key]) ? (prev[key] as number[]) : [];
      return {
        ...prev,
        [key]: arr.includes(id) ? arr.filter((v) => v !== id) : [...arr, id],
      };
    });
  }, []);

  // 다음 질문으로 이동
  const goNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  // 이전 질문으로 이동
  const goPrev = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, []);

  return {
    phase,
    start,
    reset,
    step,
    total: TOTAL_STEPS,
    answers,
    setSingle,
    toggleMulti,
    goNext,
    goPrev,
    questionsByKey,
    rememberQuestion,
  };
}
