'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import { usePhoneValidation } from '../../hooks/usePhoneValidation';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { useEmailValidation } from '../../hooks/useEmailValidation';
import { useForm } from 'react-hook-form';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { SignUpFormData } from '@/types/form';

// validation 통합 훅
const useFormValidation = () => {
  const { emailRules } = useEmailValidation();
  const { phoneRules } = usePhoneValidation();
  const { passwordRules, confirmPasswordRules } = usePasswordValidation();

  return {
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
  };
};

// 커스텀 훅으로 폼 로직 분리
const useSignUpForm = () => {
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { emailRules, phoneRules, passwordRules, confirmPasswordRules } =
    useFormValidation();

  const formMethods = useForm<SignUpFormData>({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods;
  const watchPassword = watch('password');

  const onSubmit = (data: SignUpFormData) => {
    // TODO: 회원가입 API 호출
  };

  const handleEmailVerification = () => {
    setIsEmailSent(true);
    // TODO: 이메일 인증번호 전송 API 호출
  };

  const handleEmailVerificationConfirm = () => {
    // TODO: 이메일 인증번호 확인 API 호출
  };

  const handleSendCode = () => {
    // TODO: 휴대폰 인증번호 전송 API 호출
  };

  return {
    register,
    handleSubmit,
    errors,
    watchPassword,
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
    emailVerificationCode,
    setEmailVerificationCode,
    isEmailSent,
    onSubmit,
    handleEmailVerification,
    handleEmailVerificationConfirm,
    handleSendCode,
  };
};

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [birth, setBirth] = useState('');

  const {
    register,
    handleSubmit,
    errors,
    watchPassword,
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
    emailVerificationCode,
    setEmailVerificationCode,
    isEmailSent,
    onSubmit,
    handleEmailVerification,
    handleEmailVerificationConfirm,
    handleSendCode,
  } = useSignUpForm();

  return (
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

          <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-8">
            <div className="space-y-3">
              {/* 이름 */}
              <Input
                type="text"
                placeholder={PLACEHOLDERS.NAME}
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputSize={FORM_CONFIG.INPUT_SIZE}
                variant="default"
                label="이름"
                required
                className="mb-6"
              />

              {/* 이메일 인증 */}
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  이메일 <span className="text-pink-500">*</span>
                </label>
                <div
                  className={`mb-3 grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}
                >
                  <div>
                    <Input
                      {...register('email', emailRules)}
                      type="email"
                      placeholder={PLACEHOLDERS.EMAIL}
                      inputSize={FORM_CONFIG.INPUT_SIZE}
                      variant={errors.email ? 'error' : 'default'}
                      required
                    />
                    <p
                      className={`mt-1 ${FORM_CONFIG.ERROR_HEIGHT} text-sm text-red-500`}
                    >
                      {errors.email?.message}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-fit w-full font-semibold whitespace-nowrap"
                    onClick={handleEmailVerification}
                  >
                    인증번호 전송
                  </Button>

                  {isEmailSent && (
                    <>
                      <div>
                        <Input
                          type="text"
                          placeholder={PLACEHOLDERS.VERIFICATION_CODE}
                          value={emailVerificationCode}
                          onChange={(e) =>
                            setEmailVerificationCode(e.target.value)
                          }
                          inputSize={FORM_CONFIG.INPUT_SIZE}
                          variant="default"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="w-full font-semibold whitespace-nowrap"
                        onClick={handleEmailVerificationConfirm}
                      >
                        인증 확인
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* 닉네임 */}
              <Input
                type="text"
                placeholder={PLACEHOLDERS.NICKNAME}
                value={nickname}
                onChange={(e) => setNickName(e.target.value)}
                inputSize={FORM_CONFIG.INPUT_SIZE}
                variant="default"
                label="닉네임"
                required
                className="mb-6"
              />

              {/* 휴대폰 번호 */}
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  휴대폰 번호 <span className="text-pink-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    {...register('phone', phoneRules)}
                    type="tel"
                    placeholder={PLACEHOLDERS.PHONE}
                    inputSize={FORM_CONFIG.INPUT_SIZE}
                    variant={errors.phone ? 'error' : 'default'}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleSendCode}
                    className="whitespace-nowrap"
                  >
                    인증번호 전송
                  </Button>
                </div>
                <p
                  className={`mt-1 ${FORM_CONFIG.ERROR_HEIGHT} text-sm text-red-500`}
                >
                  {errors.phone?.message}
                </p>
              </div>

              {/* 생년월일 */}
              <Input
                type="date"
                placeholder={PLACEHOLDERS.BIRTH}
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                inputSize={FORM_CONFIG.INPUT_SIZE}
                variant="default"
                label="생년월일"
                required
                className="mb-6"
              />

              {/* 비밀번호 */}
              <div className="mb-6">
                <Input
                  {...register('password', passwordRules)}
                  type="password"
                  placeholder={PLACEHOLDERS.PASSWORD}
                  inputSize={FORM_CONFIG.INPUT_SIZE}
                  variant={errors.password ? 'error' : 'default'}
                  label="비밀번호"
                  required
                />
                <p
                  className={`mt-1 ${FORM_CONFIG.ERROR_HEIGHT} text-sm text-red-500`}
                >
                  {errors.password?.message}
                </p>
              </div>

              {/* 비밀번호 확인 */}
              <div className="mb-6">
                <Input
                  {...register(
                    'confirmPassword',
                    confirmPasswordRules(watchPassword)
                  )}
                  type="password"
                  placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
                  inputSize={FORM_CONFIG.INPUT_SIZE}
                  variant={errors.confirmPassword ? 'error' : 'default'}
                  label="비밀번호 확인"
                />
                <p
                  className={`mt-1 ${FORM_CONFIG.ERROR_HEIGHT} text-sm text-red-500`}
                >
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size={FORM_CONFIG.INPUT_SIZE}
              className="w-full"
            >
              가입하기
            </Button>
          </form>
        </Grid.Item>
      </Grid>
    </div>
  );
}
