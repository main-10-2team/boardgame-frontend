// src/components/auth/SignUpForm.tsx

'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { Toast } from '@/components/common/Toast';
import { useSignUpForm } from '@/hooks/auth/useSignUpForm';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';

const SignUpForm = () => {
  const signUpForm = useSignUpForm();

  const isFormValid =
    signUpForm.form.isValid &&
    signUpForm.state.isEmailVerified &&
    signUpForm.state.isPhoneVerified;

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
            onSubmit={signUpForm.form.handleSubmit(
              signUpForm.handlers.onSubmit
            )}
            className="mb-8 space-y-6"
          >
            <Input
              {...signUpForm.form.register('name', {
                required: '이름을 입력해주세요',
              })}
              type="text"
              placeholder={PLACEHOLDERS.NAME}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="이름"
              error={signUpForm.form.errors.name?.message}
              required
            />

            <EmailVerification
              register={signUpForm.form.register}
              errors={signUpForm.form.errors}
              emailRules={signUpForm.rules.emailRules}
              isEmailSent={signUpForm.state.isEmailSent}
              isEmailVerified={signUpForm.state.isEmailVerified}
              onSendCode={signUpForm.handlers.handleEmailVerification}
              onConfirmCode={signUpForm.handlers.handleEmailVerificationConfirm}
            />

            <Input
              {...signUpForm.form.register(
                'nickname',
                signUpForm.rules.nicknameRules
              )}
              type="text"
              placeholder={PLACEHOLDERS.NICKNAME}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="닉네임"
              error={signUpForm.form.errors.nickname?.message}
              required
            />

            <PhoneVerification
              register={signUpForm.form.register}
              errors={signUpForm.form.errors}
              phoneRules={signUpForm.rules.phoneRules}
              isPhoneSent={signUpForm.state.isPhoneSent}
              isPhoneVerified={signUpForm.state.isPhoneVerified}
              onSendCode={signUpForm.handlers.handlePhoneVerification}
              onConfirmCode={signUpForm.handlers.handlePhoneVerificationConfirm}
            />

            <Input
              {...signUpForm.form.register(
                'birth',
                signUpForm.rules.birthRules
              )}
              type="text"
              placeholder="생년월일 8자리 (예: 19920930)"
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="생년월일"
              error={signUpForm.form.errors.birth?.message}
              required
            />

            <Input
              {...signUpForm.form.register(
                'password',
                signUpForm.rules.passwordRules
              )}
              type="password"
              placeholder={PLACEHOLDERS.PASSWORD}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="비밀번호"
              error={signUpForm.form.errors.password?.message}
              success={
                signUpForm.watch.password && !signUpForm.form.errors.password
                  ? '비밀번호가 올바릅니다'
                  : false
              }
              required
            />

            <Input
              {...signUpForm.form.register(
                'confirmPassword',
                signUpForm.rules.confirmPasswordRules(signUpForm.watch.password)
              )}
              type="password"
              placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
              inputSize={FORM_CONFIG.INPUT_SIZE}
              label="비밀번호 확인"
              error={signUpForm.form.errors.confirmPassword?.message}
              success={
                signUpForm.watch.confirmPassword &&
                !signUpForm.form.errors.confirmPassword
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
    </>
  );
};

export default SignUpForm;
