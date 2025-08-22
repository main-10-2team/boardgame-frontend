// 단어 정보 인터페이스 (스타일 정보 포함)
export interface Word {
  text: string;
  fontSize: number;
  fontWeight: '400' | '600';
  fill: string;
}

// 위치 정보까지 포함된 단어 (SVG 배치용)
export interface WordPosition extends Word {
  x: number;
  y: number;
}

// 너비 기준으로 폰트 크기 비율 조정
export function scaleWordsToWidth(words: Word[], maxWidth: number): Word[] {
  const REFERENCE_WIDTH = 300;
  const scale = Math.max(0.8, Math.min(1.5, maxWidth / REFERENCE_WIDTH)); // 확대/축소 비율 제한
  return words.map((word) => ({
    ...word,
    fontSize: word.fontSize * scale,
  }));
}

// Canvas를 이용해 실제 텍스트의 픽셀 너비 측정 (충돌 감지용)
function getTextWidth(
  text: string,
  fontSize: number,
  fontWeight: '400' | '600'
): number {
  if (typeof window === 'undefined') return 0;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 0;

  context.font = `${fontWeight} ${fontSize}px sans-serif`;
  return context.measureText(text).width;
}

// Spiral 방식으로 단어 배치 (겹치지 않도록 순차 배치)
export function assignSpiralPositions(
  words: Word[],
  width: number,
  height: number,
  seed = 0,
  spiralStep = 0.6,
  radiusStep = 5,
  maxAttempts = 500
): WordPosition[] {
  const centerX = width / 2;

  // 위아래 여백을 고려해 중심 y 위치 설정
  const maxTextHeight = Math.max(...words.map((w) => w.fontSize));
  const centerY = (height - maxTextHeight) / 2;

  const positions: WordPosition[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let placed = false;

    // seed 기반 초기 각도 설정 → 새로고침 시 배치 변화 유도
    let angle = ((seed + i * 19) % 360) * (Math.PI / 180);
    let radius = 10;
    let attempts = 0;

    const wordWidth = getTextWidth(word.text, word.fontSize, word.fontWeight);
    const wordHeight = word.fontSize;

    while (!placed && attempts < maxAttempts) {
      // Spiral 좌표 계산
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // 위쪽/아래쪽 잘리지 않도록 제한
      if (y - wordHeight / 2 < 0 || y + wordHeight / 2 > height) {
        angle += spiralStep;
        radius += radiusStep;
        attempts++;
        continue;
      }

      const newWord: WordPosition = { ...word, x, y };

      // 기존 단어들과 충돌 감지
      const hasCollision = positions.some((existing) => {
        const exWidth = getTextWidth(
          existing.text,
          existing.fontSize,
          existing.fontWeight
        );
        const exHeight = existing.fontSize;

        return !(
          x + wordWidth / 2 < existing.x - exWidth / 2 ||
          x - wordWidth / 2 > existing.x + exWidth / 2 ||
          y + wordHeight / 2 < existing.y - exHeight / 2 ||
          y - wordHeight / 2 > existing.y + exHeight / 2
        );
      });

      if (!hasCollision) {
        positions.push(newWord);
        placed = true;
      }

      // spiral 증가
      angle += spiralStep;
      radius += radiusStep;
      attempts++;
    }
  }

  return positions;
}
