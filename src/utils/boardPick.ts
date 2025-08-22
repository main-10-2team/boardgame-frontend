import type {
  AnswerMap,
  AnswerValue,
  Question,
  Range,
  TodaySubmitPayload,
} from '@/types/board-pick/boardPick';
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
  if (q.type === 'single-select') {
    return typeof v === 'number';
  }
  // 멀티: 최소 1개 이상 선택
  if (Array.isArray(v)) return v.length > 0;
  return false;
}

const ZERO: Range = { min: 0, max: 0 };

const asIds = (v: AnswerValue): number[] | null =>
  Array.isArray(v) ? v : null;
const asId = (v: AnswerValue): number | null =>
  typeof v === 'number' ? v : null;

function valuesFor(q: Question | undefined, ids: number[] | null): string[] {
  if (!q || !ids || ids.length === 0) return [];
  return q.options
    .filter((o) => ids.includes(o.id))
    .map((o) => o.value ?? o.label)
    .filter((v): v is string => !!v);
}

function rangeFor(q: Question | undefined, id: number | null): Range {
  if (!q || id == null) return ZERO;
  const opt = q.options.find((o) => o.id === id);
  return { min: opt?.min ?? 0, max: opt?.max ?? 0 };
}

/** 질문 key가 API 필드명과 같다는 전제:
 * 'categories' | 'players_range' | 'playtime_range' | 'age_group' | 'difficulty_range'
 */
export function buildTodaySubmitPayload(
  answers: AnswerMap,
  questionsByKey: Record<string, Question>
): TodaySubmitPayload {
  const qCat = questionsByKey['categories'];
  const qP = questionsByKey['players_range'];
  const qT = questionsByKey['playtime_range'];
  const qAge = questionsByKey['age_group'];
  const qDiff = questionsByKey['difficulty_range'];

  const payload: TodaySubmitPayload = {
    categories: valuesFor(qCat, asIds(answers['categories'])),
    players_range: rangeFor(qP, asId(answers['players_range'])),
    playtime_range: rangeFor(qT, asId(answers['playtime_range'])),
    age_group: rangeFor(qAge, asId(answers['age_group'])),
    difficulty_range: rangeFor(qDiff, asId(answers['difficulty_range'])),
  };

  return payload;
}
