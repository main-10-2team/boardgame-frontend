'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetcher } from '@/lib/fetcher'; // 실제 경로에 맞게 수정
import {
  SendCodeApiResponse,
  VerifyCodeApiResponse,
  SignUpApiResponse,
} from '@/types/auth/signup';

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

export type LoginState = {
  success: boolean;
  error: string | null;
};

export type SignUpState = {
  success: boolean;
  error: string | null;
};

export type EmailVerificationState = {
  success: boolean;
  error: string | null;
  message?: string;
};

async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };

  await cookieStore.set('access_token', accessToken, {
    ...cookieOptions,
    maxAge: 60 * 60, // 1시간
  });

  await cookieStore.set('refresh_token', refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7, // 7일
  });
}

// --- 로그인 Server Action ---
export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const data = await fetcher<EmailLoginResponse>('/api/v1/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    await setAuthCookies(data.access_token, data.refresh_token);
  } catch (error: unknown) {
    // fetcher에서 던진 에러든, 다른 에러든 상관없이 처리
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '알 수 없는 서버 오류가 발생했습니다.',
    };
  }

  redirect('/');
}

// --- 이메일 인증 코드 전송 Server Action ---
export async function sendEmailCode(
  email: string
): Promise<EmailVerificationState> {
  try {
    const data = await fetcher<SendCodeApiResponse>('/api/v1/auth/send-code/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        purpose: 'signup',
      }),
    });

    return {
      success: true,
      error: null,
      message: data.message,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '이메일 전송 중 오류가 발생했습니다.',
    };
  }
}

// --- 이메일 인증 코드 확인 Server Action ---
export async function verifyEmailCode(
  email: string,
  verificationCode: string
): Promise<EmailVerificationState> {
  try {
    const data = await fetcher<VerifyCodeApiResponse>(
      '/api/v1/auth/verify-code/',
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          verification_code: verificationCode,
          purpose: 'signup',
        }),
      }
    );

    return {
      success: true,
      error: null,
      message: data.message || '인증이 완료되었습니다.',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '인증 확인 중 오류가 발생했습니다.',
    };
  }
}

// --- 회원가입 Server Action ---
export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  try {
    const data = await fetcher<SignUpApiResponse>('/api/v1/auth/signup/', {
      method: 'POST',
      body: formData, // FormData 그대로 전송
    });

    await setAuthCookies(data.access_token, data.refresh_token);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '회원가입 중 오류가 발생했습니다.',
    };
  }

  redirect('/preference');
}
