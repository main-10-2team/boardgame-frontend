// src/hooks/auth/useSignUpForm.ts

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';
import { useBirthValidation } from '@/hooks/useBirthValidation';
import { UnifiedSignUpFormData, SignUpApiData } from '@/types/auth/signup';

export const useSignUpForm = () => {
  const router = useRouter();
  const { toasts, success, error } = useToast();

  const { emailRules } = useEmailValidation();
  const { phoneRules, convertToInternational } = usePhoneValidation();
  const { passwordRules, confirmPasswordRules } = usePasswordValidation();
  const { nicknameRules } = useNicknameValidation();
  const { birthRules, formatBirthForSave } = useBirthValidation();

  const formMethods = useForm<UnifiedSignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      phone: '',
      birth: '',
      password: '',
      confirmPassword: '',
      emailVerificationCode: '',
      phoneVerificationCode: '',

      isEmailSent: false,
      isEmailVerified: false,
      isPhoneSent: false,
      isPhoneVerified: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = formMethods;

  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  const watchEmail = watch('email');
  const watchPhone = watch('phone');
  const watchEmailCode = watch('emailVerificationCode');
  const watchPhoneCode = watch('phoneVerificationCode');

  const isEmailSent = watch('isEmailSent');
  const isEmailVerified = watch('isEmailVerified');
  const isPhoneSent = watch('isPhoneSent');
  const isPhoneVerified = watch('isPhoneVerified');

  const onSubmit = (data: UnifiedSignUpFormData) => {
    if (!data.isEmailVerified) {
      error('이메일 인증을 완료해주세요');
      return;
    }

    if (!data.isPhoneVerified) {
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

    success('이메일 인증번호가 전송되었습니다!');
    setValue('isEmailSent', true);
    setValue('isEmailVerified', false);
  };

  // 이메일 인증번호 확인
  const handleEmailVerificationConfirm = () => {
    if (!watchEmailCode?.trim()) {
      error('인증번호를 입력해주세요');
      return;
    }

    success('이메일 인증이 완료되었습니다!');
    setValue('isEmailVerified', true);
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

    success('휴대폰 인증번호가 전송되었습니다!');
    setValue('isPhoneSent', true);
    setValue('isPhoneVerified', false);
  };

  const handlePhoneVerificationConfirm = () => {
    if (!watchPhoneCode?.trim()) {
      error('인증번호를 입력해주세요');
      return;
    }

    success('휴대폰 인증이 완료되었습니다!');
    setValue('isPhoneVerified', true);
  };

  return {
    form: {
      register,
      handleSubmit,
      errors,
      isValid,
    },

    watch: {
      password: watchPassword,
      confirmPassword: watchConfirmPassword,
    },

    state: {
      isEmailSent,
      isEmailVerified,
      isPhoneSent,
      isPhoneVerified,
    },

    rules: {
      emailRules,
      phoneRules,
      passwordRules,
      confirmPasswordRules,
      nicknameRules,
      birthRules,
    },

    handlers: {
      onSubmit,
      handleEmailVerification,
      handleEmailVerificationConfirm,
      handlePhoneVerification,
      handlePhoneVerificationConfirm,
    },

    toasts,
  };
};
