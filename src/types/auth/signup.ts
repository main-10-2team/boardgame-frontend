export interface SignUpFormData {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  birth: string;
  password: string;
  confirmPassword: string;
}

export interface ExtendedSignUpFormData extends SignUpFormData {
  emailVerificationCode: string;
  phoneVerificationCode: string;
}

export interface SignUpVerificationState {
  isEmailSent: boolean;
  isEmailVerified: boolean;
  isPhoneSent: boolean;
  isPhoneVerified: boolean;
}

// api 전송데이터
export interface SignUpApiData {
  name: string;
  email: string;
  nickname: string;
  phone: string;
  birth: string;
  password: string;
}

// ======================
// API 응답 타입들 (실제 백엔드 응답 구조)
// ======================

export interface SendCodeApiResponse {
  message: string;
}

export interface VerifyCodeApiResponse {
  message?: string;
}

export interface SignUpApiResponse {
  status: string;
  message: string;
  user: {
    user_id: number;
    email: string;
    nickname: string;
    phone_number: string;
    birth: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  profile_img_url: string | null;
  access_token: string;
  refresh_token: string;
}

// 에러 응답 (모든 API 공통)
export interface ApiErrorResponse {
  non_field_errors?: string[];
  [field: string]: string[] | undefined; // 필드별 에러
}
