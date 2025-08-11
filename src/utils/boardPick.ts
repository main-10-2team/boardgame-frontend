import type { AnswerMap, Question } from '@/types/board-pick/boardPick';
/**
 * 질문 리스트로부터 초기 답변 객체 생성
 * - single-select: null
 * - multi-select : []
 */
export function makeInitialAnswers(questions: Question[]): AnswerMap {
  const out: AnswerMap = {};
  for (const q of questions) {
    out[q.key] = q.type === 'single-select' ? null : [];
  }
  return out;
}

/**
 * 해당 질문이 답변되었는지 판정
 * - single-select: null이 아니면 true
 * - multi-select : 길이가 1 이상이면 true
 */
export function isAnswered(q: Question, v: unknown): boolean {
  return q.type === 'single-select'
    ? v !== null
    : Array.isArray(v) && v.length > 0;
}
