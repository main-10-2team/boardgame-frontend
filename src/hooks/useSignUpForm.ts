import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useFormValidation } from './useFormValidation';
import { useToast } from '@/hooks/useToast';
import { ExtendedSignUpFormData, SignUpApiData } from '@/types/auth/signup';

export const useSignUpForm = () => {
  const router = useRouter();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const { toasts, success, error } = useToast();

  const {
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
    nicknameRules,
    birthRules,
    convertToInternational,
    formatBirthForSave,
  } = useFormValidation();

  const formMethods = useForm<ExtendedSignUpFormData>({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = formMethods;

  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  const watchEmail = watch('email');
  const watchPhone = watch('phone');
  const watchEmailCode = watch('emailVerificationCode');
  const watchPhoneCode = watch('phoneVerificationCode');

  const validatePassword = (password: string): boolean => {
    if (!password) return false;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const isPasswordMatch = (confirm: string): boolean => {
    if (!confirm || !watchPassword) return false;
    return confirm === watchPassword;
  };

  const onSubmit = (data: ExtendedSignUpFormData) => {
    if (!isEmailVerified) {
      error('이메일 인증을 완료해주세요');
      return;
    }

    if (!isPhoneVerified) {
      error('휴대폰 인증을 완료해주세요');
      return;
    }

    const signUpData: SignUpApiData = {
      name: data.name,
      email: data.email,
      nickname: data.nickname,
      phone: convertToInternational(data.phone),
      birth: formatBirthForSave(data.birth),
      password: data.password,
    };

    //api 호출

    success('회원가입이 완료되었습니다!');

    setTimeout(() => {
      router.push('/preference');
    }, 1500);
  };

  const handleEmailVerification = () => {
    if (!watchEmail) {
      error('이메일을 입력해주세요');
      return;
    }
    if (!emailRules.pattern.value.test(watchEmail)) {
      error('올바른 이메일 형식으로 입력해주세요');
      return;
    }

    //api 호출

    success('이메일 인증번호가 전송되었습니다!');
    setIsEmailSent(true);
    setIsEmailVerified(false);
  };

  const handleEmailVerificationConfirm = () => {
    if (!watchEmailCode?.trim()) {
      error('인증번호를 입력해주세요');
      return;
    }

    // api 호출
    success('이메일 인증이 완료되었습니다!');
    setIsEmailVerified(true);
  };

  const handlePhoneVerification = () => {
    if (!watchPhone) {
      error('휴대폰 번호를 입력해주세요');
      return;
    }
    if (!phoneRules.pattern.value.test(watchPhone.replace(/[^0-9]/g, ''))) {
      error('올바른 휴대폰 번호 형식으로 입력해주세요');
      return;
    }

    // api 호출

    success('휴대폰 인증번호가 전송되었습니다!');
    setIsPhoneSent(true);
    setIsPhoneVerified(false);
  };

  const handlePhoneVerificationConfirm = () => {
    if (!watchPhoneCode?.trim()) {
      error('인증번호를 입력해주세요');
      return;
    }

    success('휴대폰 인증이 완료되었습니다!');
    setIsPhoneVerified(true);
  };

  return {
    register,
    handleSubmit,
    errors,
    watchPassword,
    watchConfirmPassword,
    validatePassword,
    isPasswordMatch,
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
    nicknameRules,
    birthRules,
    isEmailSent,
    isEmailVerified,
    isPhoneSent,
    isPhoneVerified,
    isValid,
    toasts,
    onSubmit,
    handleEmailVerification,
    handleEmailVerificationConfirm,
    handlePhoneVerification,
    handlePhoneVerificationConfirm,
  };
};
