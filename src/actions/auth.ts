'use server';

import { fetcher } from '@/lib/fetcher'; // 실제 경로에 맞게 수정
import {
  SendCodeApiResponse,
  SignUpApiResponse,
  VerifyCodeApiResponse,
} from '@/types/auth/signup';
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

export type FindIdState = {
  success: boolean;
  error: string | null;
  email?: string;
};

export type PasswordResetState = {
  success: boolean;
  error: string | null;
  message?: string;
};

export type PasswordResetVerifyState = {
  success: boolean;
  error: string | null;
  reset_token?: string;
};

export type PasswordChangeState = {
  success: boolean;
  error: string | null;
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
    const data = await fetcher<EmailLoginResponse>('/auth/login/', {
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
    const data = await fetcher<SendCodeApiResponse>('/auth/send-code/', {
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
    const data = await fetcher<VerifyCodeApiResponse>('/auth/verify-code/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        verification_code: verificationCode,
        purpose: 'signup',
      }),
    });

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
    const data = await fetcher<SignUpApiResponse>('/auth/signup/', {
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

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

// --- 아이디 찾기 Server Action ---
export async function findUserId(
  prevState: FindIdState,
  formData: FormData
): Promise<FindIdState> {
  const phone = formData.get('phone') as string;

  if (!phone) {
    return { success: false, error: '휴대폰 번호를 입력해주세요' };
  }

  const convertToInternational = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('010')) {
      return `+82${cleaned.substring(1)}`;
    }
    return `+82${cleaned}`;
  };

  try {
    const data = await fetcher<{ email: string; user_id?: string }>(
      '/auth/find-id/',
      {
        method: 'POST',
        body: JSON.stringify({
          phone_number: convertToInternational(phone),
        }),
      }
    );

    return {
      success: true,
      error: null,
      email: data.email || data.user_id,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '아이디를 찾을 수 없습니다.',
    };
  }
}

export async function sendPasswordResetCode(
  email: string
): Promise<PasswordResetState> {
  try {
    const data = await fetcher<SendCodeApiResponse>(
      '/auth/reset-password/request/',
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          purpose: 'restore', // purpose가 restore였죠!
        }),
      }
    );

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
      error: '인증번호 전송 중 오류가 발생했습니다.',
    };
  }
}

// --- 비밀번호 재설정 인증번호 확인 Server Action ---
export async function verifyPasswordResetCode(
  email: string,
  verificationCode: string
): Promise<PasswordResetVerifyState> {
  try {
    const data = await fetcher<{ reset_token: string; message?: string }>(
      '/auth/reset-password/verify/',
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          verification_code: verificationCode,
        }),
      }
    );

    return {
      success: true,
      error: null,
      reset_token: data.reset_token,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '인증번호 확인 중 오류가 발생했습니다.',
    };
  }
}

// --- 비밀번호 변경 Server Action ---
export async function changePassword(
  resetToken: string,
  newPassword: string
): Promise<PasswordChangeState> {
  try {
    const data = await fetcher<{ message: string }>(
      '/auth/reset-password/finalize/',
      {
        method: 'POST',
        body: JSON.stringify({
          reset_token: resetToken,
          new_password: newPassword,
        }),
      }
    );

    return {
      success: true,
      error: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: '비밀번호 변경 중 오류가 발생했습니다.',
    };
  }
}
