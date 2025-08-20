export function formatDifficulty(difficulty?: string): number {
  // '쉬움' | '보통' | '어려움' | '알수없음';
  switch (difficulty) {
    case '쉬움':
      return 1;
    case '중급':
      return 2;
    case '어려움':
      return 3;
    default:
      return 0;
  }
}
