'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';
import { useBirthValidation } from '@/hooks/useBirthValidation';
import { useForm } from 'react-hook-form';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { SignUpFormData } from '@/types/form';
import { Toast } from '@/components/common/Toast';
import { useToast } from '@/hooks/useToast';

interface ExtendedSignUpFormData extends SignUpFormData {
  emailVerificationCode: string;
  phoneVerificationCode: string;
  emailStatus: 'idle' | 'sent' | 'verified';
  phoneStatus: 'idle' | 'sent' | 'verified';
}

const useFormValidation = () => {
  const { emailRules } = useEmailValidation();
  const { phoneRules, convertToInternational } = usePhoneValidation();
  const { passwordRules, confirmPasswordRules } = usePasswordValidation();
  const { nicknameRules } = useNicknameValidation();
  const { birthRules, formatBirthForSave } = useBirthValidation();

  return {
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
    nicknameRules,
    birthRules,
    convertToInternational,
    formatBirthForSave,
  };
};

const useSignUpForm = () => {
  const router = useRouter();
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
    defaultValues: {
      name: '',
      email: '',
      nickname: '',
      phone: '',
      birth: '',
      password: '',
      confirmPassword: '',
      emailVerificationCode: '',
      phoneVerificationCode: '',
      emailStatus: 'idle',
      phoneStatus: 'idle',
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

  const emailStatus = watch('emailStatus');
  const phoneStatus = watch('phoneStatus');

  const isVerified = {
    email: emailStatus === 'verified',
    phone: phoneStatus === 'verified',
  };

  const onSubmit = (data: ExtendedSignUpFormData) => {
    if (!isVerified.email) {
      error('이메일 인증을 완료해주세요');
      return;
    }
    if (!isVerified.phone) {
      error('휴대폰 인증을 완료해주세요');
      return;
    }

    const signUpData = {
      name: data.name,
      email: data.email,
      nickname: data.nickname,
      phone: convertToInternational(data.phone),
      birth: formatBirthForSave(data.birth),
      password: data.password,
    };

    success('회원가입이 완료되었습니다!');
    setTimeout(() => router.push('/preference'), 1500);
  };

  const handleEmailVerification = () => {
    if (!watchEmail) return error('이메일을 입력해주세요');
    if (!emailRules.pattern.value.test(watchEmail)) {
      return error('올바른 이메일 형식으로 입력해주세요');
    }
    success('이메일 인증번호가 전송되었습니다!');
    setValue('emailStatus', 'sent');
  };

  const handleEmailVerificationConfirm = () => {
    if (!watchEmailCode?.trim()) return error('인증번호를 입력해주세요');
    success('이메일 인증이 완료되었습니다!');
    setValue('emailStatus', 'verified');
  };

  const handlePhoneVerification = () => {
    if (!watchPhone) return error('휴대폰 번호를 입력해주세요');
    if (!phoneRules.pattern.value.test(watchPhone.replace(/[^0-9]/g, ''))) {
      return error('올바른 휴대폰 번호 형식으로 입력해주세요');
    }
    success('휴대폰 인증번호가 전송되었습니다!');
    setValue('phoneStatus', 'sent');
  };

  const handlePhoneVerificationConfirm = () => {
    if (!watchPhoneCode?.trim()) return error('인증번호를 입력해주세요');
    success('휴대폰 인증이 완료되었습니다!');
    setValue('phoneStatus', 'verified');
  };

  return {
    register,
    handleSubmit,
    errors,
    watchPassword,
    watchConfirmPassword,
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
    nicknameRules,
    birthRules,
    emailStatus,
    phoneStatus,
    isValid,
    toasts,
    onSubmit,
    handleEmailVerification,
    handleEmailVerificationConfirm,
    handlePhoneVerification,
    handlePhoneVerificationConfirm,
    isVerified,
  };
};

export default useSignUpForm;
