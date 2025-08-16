'use client';

import type { AnswerMap, Question } from '@/types/board-pick/boardPick';
import { isAnswered } from '@/utils/boardPick';
import { useCallback, useState } from 'react';

export type Phase = 'intro' | 'survey';

export function useBoardPickSurvey() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [step, setStep] = useState(1);
  const [total, setTotal] = useState<number | null>(null);

  const [current, setCurrent] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});

  // 질문 API 불러오기
  const fetchQuestion = useCallback(async (step: number) => {
    try {
      const res = await fetch(`/api/v1/today/question/${step}`);
      if (!res.ok) {
        throw new Error(`질문 ${step}번 API 에러: ${res.status}`);
      }
      const data: Question & { total: number } = await res.json();

      setCurrent(data);
      setTotal(data.total); // 서버에서 전체 질문 개수를 같이 내려주면
    } catch (err) {
      console.error(`질문 ${step} 불러오기 실패`, err);
      setCurrent(null);
    }
  }, []);

  // 설문 시작 → 1번 질문 fetch
  const start = useCallback(() => {
    setPhase('survey');
    fetchQuestion(1);
  }, [fetchQuestion]);

  // 단일 선택형 답변 설정
  const setSingle = useCallback((key: string, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [key]: optionId }));
  }, []);

  // 다중 선택형 답변 토글
  const toggleMulti = useCallback((key: string, optionId: number) => {
    setAnswers((prev) => {
      const prevArr = Array.isArray(prev[key]) ? (prev[key] as number[]) : [];
      const next = prevArr.includes(optionId)
        ? prevArr.filter((v) => v !== optionId)
        : [...prevArr, optionId];
      return { ...prev, [key]: next };
    });
  }, []);

  // 다음 질문으로 이동
  const goNext = useCallback(async () => {
    if (!current || !current.key) return;

    // 현재 답변 저장
    const answer = answers[current.key];
    await fetch(`/api/v1/today/answer/${step}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: current.key, value: answer }),
    });

    const nextStep = step + 1;
    setStep(nextStep);
    await fetchQuestion(nextStep);
  }, [answers, current, step, fetchQuestion]);

  // 이전 질문으로 이동
  const goPrev = useCallback(async () => {
    const prevStep = step - 1;
    if (prevStep < 1) return;

    setStep(prevStep);
    await fetchQuestion(prevStep);
  }, [step, fetchQuestion]);

  // 다음 버튼 활성화 여부
  const canNext =
    phase !== 'survey' ||
    (current ? isAnswered(current, answers[current.key]) : false);

  return {
    phase,
    start,
    step,
    total,
    current,
    answers,
    setSingle,
    toggleMulti,
    goNext,
    goPrev,
    canNext,
  };
}
