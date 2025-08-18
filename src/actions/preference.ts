'use server';

import { cookies } from 'next/headers';
import { fetcher } from '@/lib/fetcher';
import {
  SurveyChoicesResponse,
  SurveySubmitResponse,
  PreferenceState,
} from '@/types/preference';

// --- 게임 목록 조회 ---
export async function getSurveyChoices(): Promise<SurveyChoicesResponse> {
  const jar = await cookies();
  const accessToken = jar.get('access_token')?.value;

  // 이 페이지는 인증된 사용자만 접근하므로 토큰이 반드시 있음
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const data = await fetcher<SurveyChoicesResponse>(
      '/survey/choices',
      {
        method: 'GET',
        signal: controller.signal,
      },
      accessToken
    );

    clearTimeout(timeoutId);
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// --- 설문 제출 Server Action ---
export async function submitSurvey(
  prevState: PreferenceState,
  formData: FormData
): Promise<PreferenceState> {
  const jar = await cookies();
  const accessToken = jar.get('access_token')?.value;

  // FormData에서 선택된 게임 ID들 추출
  const likedGames: number[] = [];
  for (const [key, value] of formData.entries()) {
    if (key === 'liked_games') {
      likedGames.push(parseInt(value as string));
    }
  }

  if (likedGames.length === 0) {
    return { success: false, error: '최소 1개의 게임을 선택해주세요.' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const data = await fetcher<SurveySubmitResponse>(
      '/survey/submit',
      {
        method: 'POST',
        body: JSON.stringify({ liked_games: likedGames }),
        signal: controller.signal,
      },
      accessToken
    );

    clearTimeout(timeoutId);
    return {
      success: true,
      error: null,
      message: data.message,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '설문 제출 중 오류가 발생했습니다.',
    };
  }
}
