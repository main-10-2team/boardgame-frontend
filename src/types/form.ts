export interface SignUpFormData {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  birth: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationState {
  emailVerificationCode: string;
  isEmailSent: boolean;
}
