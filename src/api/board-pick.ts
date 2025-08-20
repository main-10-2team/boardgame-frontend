import type {
  Question,
  TodaySubmitPayload,
  TodaySubmitResponse,
} from '@/types/board-pick/boardPick';

// 설문 항목 GET
export async function fetchTodayQuestion(step: number): Promise<Question> {
  const res = await fetch(`/api/today/${step}`, {
    credentials: 'include', // 쿠키 전달
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GET /api/today/${step} ${res.status} ${text}`);
  }

  return res.json() as Promise<Question>;
}

export async function submitTodayAnswers(
  payload: TodaySubmitPayload
): Promise<TodaySubmitResponse> {
  console.log('[Submit] payload', payload);
  const res = await fetch('/api/today/submit', {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text().catch(() => '');
  if (!res.ok) {
    console.error('[Submit] fail', res.status, text);
    throw new Error(`POST /api/today/submit ${res.status} ${text}`);
  }

  const json = JSON.parse(text) as TodaySubmitResponse;
  console.log('[Submit] response', json);
  return json;
}
