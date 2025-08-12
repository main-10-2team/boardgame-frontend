// src/components/auth/SignUpForm.tsx

'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { Toast } from '@/components/common/Toast';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';

const SignUpForm = () => {
  const signUpForm = useSignUpForm();

  const isFormValid =
    signUpForm.isValid &&
    signUpForm.isEmailVerified &&
    signUpForm.isPhoneVerified;

  return (
    <>
      <Toast toasts={signUpForm.toasts} />
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

          <form
            onSubmit={signUpForm.handleSubmit(signUpForm.onSubmit)}
            className="mb-8 space-y-6"
          >
            {/* 이름 */}
            <Input
              {...signUpForm.register('name', {
                required: '이름을 입력해주세요',
              })}
              type="text"
              placeholder={PLACEHOLDERS.NAME}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="이름"
              error={signUpForm.errors.name?.message}
              required
            />

            {/* 이메일 인증 */}
            <EmailVerification
              register={signUpForm.register}
              errors={signUpForm.errors}
              emailRules={signUpForm.emailRules}
              isEmailSent={signUpForm.isEmailSent}
              isEmailVerified={signUpForm.isEmailVerified}
              onSendCode={signUpForm.handleEmailVerification}
              onConfirmCode={signUpForm.handleEmailVerificationConfirm}
            />

            {/* 닉네임 */}
            <Input
              {...signUpForm.register('nickname', signUpForm.nicknameRules)}
              type="text"
              placeholder={PLACEHOLDERS.NICKNAME}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="닉네임"
              error={signUpForm.errors.nickname?.message}
              required
            />

            {/* 휴대폰 인증 */}
            <PhoneVerification
              register={signUpForm.register}
              errors={signUpForm.errors}
              phoneRules={signUpForm.phoneRules}
              isPhoneSent={signUpForm.isPhoneSent}
              isPhoneVerified={signUpForm.isPhoneVerified}
              onSendCode={signUpForm.handlePhoneVerification}
              onConfirmCode={signUpForm.handlePhoneVerificationConfirm}
            />

            {/* 생년월일 */}
            <Input
              {...signUpForm.register('birth', signUpForm.birthRules)}
              type="text"
              placeholder="생년월일 8자리 (예: 19920930)"
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="생년월일"
              error={signUpForm.errors.birth?.message}
              required
            />

            {/* 비밀번호 */}
            <Input
              {...signUpForm.register('password', signUpForm.passwordRules)}
              type="password"
              placeholder={PLACEHOLDERS.PASSWORD}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="비밀번호"
              error={signUpForm.errors.password?.message}
              success={
                signUpForm.watchPassword &&
                signUpForm.validatePassword(signUpForm.watchPassword) &&
                !signUpForm.errors.password
                  ? '비밀번호가 올바릅니다'
                  : false
              }
              required
            />

            {/* 비밀번호 확인 */}
            <Input
              {...signUpForm.register(
                'confirmPassword',
                signUpForm.confirmPasswordRules(signUpForm.watchPassword)
              )}
              type="password"
              placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="비밀번호 확인"
              error={signUpForm.errors.confirmPassword?.message}
              success={
                signUpForm.watchConfirmPassword &&
                signUpForm.isPasswordMatch(signUpForm.watchConfirmPassword) &&
                !signUpForm.errors.confirmPassword
                  ? '비밀번호가 일치합니다'
                  : false
              }
              required
            />

            {/* 가입하기 버튼 */}
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
    </>
  );
};

export default SignUpForm;
