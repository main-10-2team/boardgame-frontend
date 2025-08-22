// lib/api/likes.ts
export async function toggleLikeApi(gameId: number) {
  const res = await fetch(`/api/likes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game_id: gameId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw { status: res.status, message: data?.action ?? '알 수 없는 오류' };
  }

  return data; // { action: 'added' | 'removed' }
}
