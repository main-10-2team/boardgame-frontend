'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { Toast } from '@/components/common/Toast';
import useSignUpForm from '@/hooks/useSignupForm';

export default function SignUpPage() {
  const {
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
  } = useSignUpForm();

  return (
    <>
      <Toast toasts={toasts} />
      <div className="inner">
        <Grid className="pt-20 pb-30">
          <Grid.Item span={FORM_CONFIG.GRID_SPAN}>
            <header className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-extrabold text-gray-900">
                회원가입
              </h1>
              <p className="text-sm text-gray-600">
                함께하수록 더 재밌는 보드큐, 지금 시작해보세요.
              </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-6">
              <Input
                {...register('name', { required: '이름을 입력해주세요' })}
                type="text"
                placeholder={PLACEHOLDERS.NAME}
                label="이름"
                error={errors.name?.message}
                required
              />

              {/* 나머지 Input, 인증 버튼들도 간단히 이 구조로 배치 */}

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!isValid || !isVerified.email || !isVerified.phone}
                className="w-full"
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
