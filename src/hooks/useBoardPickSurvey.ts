'use client';

import type { AnswerMap, Question } from '@/types/board-pick/boardPick';
import { isAnswered, makeInitialAnswers } from '@/utils/boardPick';
import { useCallback, useMemo, useState } from 'react';

export type Phase = 'intro' | 'survey';

export function useBoardPickSurvey(questions: Question[]) {
  // 질문 배열을 복사해 메모이제이션 (questions 배열 변경 시에만 재생성)
  const items = useMemo(() => questions.slice(), [questions]);
  const total = items.length;

  // 현재 설문 단계 상태
  const [phase, setPhase] = useState<Phase>('intro');
  // 현재 질문 인덱스
  const [idx, setIdx] = useState(0);
  // 각 질문에 대한 초기 답변 상태 생성 (single-select: null, multi-select: [])
  const [answers, setAnswers] = useState<AnswerMap>(() =>
    makeInitialAnswers(items)
  );
  // 현재 질문 객체 (인덱스 범위를 벗어나면 null)
  const current = items[idx] ?? null;

  // 현재 진행 중인 단계 번호 (1부터 시작)
  const step = idx + 1;

  // 설문 시작 함수 (intro → survey로 전환)
  const start = useCallback(() => setPhase('survey'), []);

  // 단일 선택형 답변 설정
  const setSingle = useCallback((key: string, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [key]: optionId }));
  }, []);

  // 다중 선택형 답변 토글 (선택/해제)
  const toggleMulti = useCallback((key: string, optionId: number) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[key]) ? (prev[key] as number[]) : [];
      const next = arr.includes(optionId)
        ? arr.filter((v) => v !== optionId) // 이미 선택되어 있으면 제거
        : [...arr, optionId]; // 선택 안 되어 있으면 추가
      return { ...prev, [key]: next };
    });
  }, []);

  // 다음 질문으로 이동
  const goNext = useCallback(() => {
    if (phase !== 'survey') return;
    setIdx((i) => (i < total - 1 ? i + 1 : i));
  }, [phase, total]);

  // 이전 질문으로 이동
  const goPrev = useCallback(() => {
    if (phase !== 'survey') return;
    setIdx((i) => (i > 0 ? i - 1 : i));
  }, [phase]);

  // 다음 버튼 활성화 여부 (현재 질문에 답변이 되어야 true)
  const canNext =
    phase !== 'survey' ||
    (current ? isAnswered(current, answers[current.key]) : false);

  // 훅에서 제공하는 상태와 조작 함수들 반환
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
