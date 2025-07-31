export function formatDifficulty(
  difficulty?: number
): '쉬움' | '보통' | '어려움' | '알수없음' {
  if (difficulty == null) return '알수없음';
  if (difficulty < 2.0) return '쉬움';
  if (difficulty < 3.5) return '보통';
  return '어려움';
}
