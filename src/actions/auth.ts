'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type EmailLoginResponse = {
  access_token: string;
  refresh_token: string;
  message: string;
  user: {
    user_id: number;
    email: string;
    nickname: string;
    phone_number: string;
    birth: string;
    role: 'user' | 'admin';
    status: 'active' | 'suspended' | 'deleted';
  };
};

type ErrorResponse = {
  detail?: string;
};

export type LoginState = {
  success: boolean;
  error: string | null;
};

// --- 로그인 Server Action ---
export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const loginData = {
    email: email,
    password: password,
  };

  try {
    const res = await fetch('https://boardq.o-r.kr/api/v1/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      const errorData: ErrorResponse = await res.json();
      return { success: false, error: errorData.detail || '로그인 실패' };
    }

    const data: EmailLoginResponse = await res.json();

    const cookieStore = await cookies();

    await cookieStore.set('accessToken', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    await cookieStore.set('refreshToken', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '알 수 없는 서버 오류가 발생했습니다.';
    return { success: false, error: message };
  }

  redirect('/');
}
