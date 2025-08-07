'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import { usePhoneValidation } from '../../../hooks/usePhoneValidation';
import { usePasswordValidation } from '../../../hooks/usePasswordValidation';
import { useEmailValidation } from '../../../hooks/useEmailValidation';
import { useNicknameValidation } from '../../../hooks/useNicknameValidation';
import { useBirthValidation } from '../../../hooks/useBirthValidation';
import { useForm } from 'react-hook-form';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { SignUpFormData } from '@/types/form';
import { Toast } from '@/components/common/Toast';
import { useToast } from '@/hooks/useToast';

interface ExtendedSignUpFormData extends SignUpFormData {
  emailVerificationCode: string;
  phoneVerificationCode: string;
}

// validation 통합 훅
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

// 커스텀 훅으로 폼 로직 분리
const useSignUpForm = () => {
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

    // 실제 API 호출 시 사용할 데이터
    const _signUpData = {
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
    setIsEmailSent(true);
    setIsEmailVerified(false);
  };

  const handleEmailVerificationConfirm = () => {
    if (!watchEmailCode?.trim()) {
      error('인증번호를 입력해주세요');
      return;
    }

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

export default function SignUpPage() {
  const {
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
  } = useSignUpForm();

  const isFormValid = isValid && isEmailVerified && isPhoneVerified;

  return (
    <>
      <Toast toasts={toasts} />
      <div className="inner">
        <Grid className="pt-20 pb-30">
          <Grid.Item span={FORM_CONFIG.GRID_SPAN}>
            <header className="mb-8 text-center">
              <h1 className="mb-2 text-2xl leading-[49px] font-extrabold text-gray-900">
                회원가입
              </h1>
              <p className="text-sm leading-[140%] font-normal tracking-tight text-gray-600">
                함께하수록 더 재밌는 보드큐, 지금 시작해보세요.
              </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-6">
              {/* 이름 */}
              <Input
                {...register('name', { required: '이름을 입력해주세요' })}
                type="text"
                placeholder={PLACEHOLDERS.NAME}
                inputSize={FORM_CONFIG.INPUT_SIZE}
                label="이름"
                error={errors.name?.message}
                required
              />

              {/* 이메일 인증 */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  이메일 <span className="text-primary-500">*</span>
                </label>
                <div
                  className={`grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}
                >
                  <Input
                    {...register('email', emailRules)}
                    type="email"
                    placeholder={PLACEHOLDERS.EMAIL}
                    inputSize={FORM_CONFIG.INPUT_SIZE}
                    error={errors.email?.message}
                    success={
                      isEmailVerified ? '이메일 인증이 완료되었습니다' : false
                    }
                    required
                  />
                  <div className="flex items-start">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-fit w-full font-semibold whitespace-nowrap"
                      onClick={handleEmailVerification}
                    >
                      인증번호 전송
                    </Button>
                  </div>
                </div>

                {isEmailSent && (
                  <div
                    className={`mt-3 grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}
                  >
                    <Input
                      {...register('emailVerificationCode')}
                      type="text"
                      placeholder={PLACEHOLDERS.VERIFICATION_CODE}
                      inputSize={FORM_CONFIG.INPUT_SIZE}
                      success={
                        isEmailVerified ? '인증번호가 확인되었습니다' : false
                      }
                    />
                    <div className="flex items-start">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-fit w-full font-semibold whitespace-nowrap"
                        onClick={handleEmailVerificationConfirm}
                        disabled={isEmailVerified}
                      >
                        인증번호 확인
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* 닉네임 */}
              <Input
                {...register('nickname', nicknameRules)}
                type="text"
                placeholder={PLACEHOLDERS.NICKNAME}
                inputSize={FORM_CONFIG.INPUT_SIZE}
                label="닉네임"
                error={errors.nickname?.message}
                required
              />

              {/* 휴대폰 번호 */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  휴대폰 번호 <span className="text-primary-500">*</span>
                </label>
                <div
                  className={`grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}
                >
                  <Input
                    {...register('phone', phoneRules)}
                    type="tel"
                    placeholder={PLACEHOLDERS.PHONE}
                    inputSize={FORM_CONFIG.INPUT_SIZE}
                    error={errors.phone?.message}
                    success={
                      isPhoneVerified ? '휴대폰 인증이 완료되었습니다' : false
                    }
                    required
                  />
                  <div className="flex items-start">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-fit w-full font-semibold whitespace-nowrap"
                      onClick={handlePhoneVerification}
                    >
                      인증번호 전송
                    </Button>
                  </div>
                </div>

                {isPhoneSent && (
                  <div
                    className={`mt-3 grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}
                  >
                    <Input
                      {...register('phoneVerificationCode')}
                      type="text"
                      placeholder={PLACEHOLDERS.VERIFICATION_CODE}
                      inputSize={FORM_CONFIG.INPUT_SIZE}
                      success={
                        isPhoneVerified ? '인증번호가 확인되었습니다' : false
                      }
                    />
                    <div className="flex items-start">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-fit w-full font-semibold whitespace-nowrap"
                        onClick={handlePhoneVerificationConfirm}
                        disabled={isPhoneVerified}
                      >
                        인증번호 확인
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* 생년월일 */}
              <Input
                {...register('birth', birthRules)}
                type="text"
                placeholder="생년월일 8자리 (예: 19920930)"
                inputSize={FORM_CONFIG.INPUT_SIZE}
                label="생년월일"
                error={errors.birth?.message}
                required
              />

              {/* 비밀번호 */}
              <Input
                {...register('password', passwordRules)}
                type="password"
                placeholder={PLACEHOLDERS.PASSWORD}
                inputSize={FORM_CONFIG.INPUT_SIZE}
                label="비밀번호"
                error={errors.password?.message}
                success={
                  watchPassword &&
                  validatePassword(watchPassword) &&
                  !errors.password
                    ? '비밀번호가 올바릅니다'
                    : false
                }
                required
              />

              {/* 비밀번호 확인 */}
              <Input
                {...register(
                  'confirmPassword',
                  confirmPasswordRules(watchPassword)
                )}
                type="password"
                placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
                inputSize={FORM_CONFIG.INPUT_SIZE}
                label="비밀번호 확인"
                error={errors.confirmPassword?.message}
                success={
                  watchConfirmPassword &&
                  isPasswordMatch(watchConfirmPassword) &&
                  !errors.confirmPassword
                    ? '비밀번호가 일치합니다'
                    : false
                }
                required
              />

              <Button
                type="submit"
                variant="primary"
                size={FORM_CONFIG.INPUT_SIZE}
                className={`w-full text-white ${
                  isFormValid
                    ? 'bg-primary-500 hover:bg-primary-600 cursor-pointer'
                    : 'cursor-not-allowed bg-gray-300'
                }`}
                disabled={!isFormValid}
              >
                가입하기
              </Button>
            </form>
          </Grid.Item>
        </Grid>
      </div>
    </>
  );
}
