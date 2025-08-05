'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import { Toast } from '@/components/common/Toast';
import { useToast } from '@/hooks/useToast';
import { useEmailValidation } from '@/hooks/useEmailValidation';

const FORM_LAYOUT = {
  COLUMNS: 'grid-cols-[2fr_1fr]',
};

const PLACEHOLDER = {
  NAME: '이름 입력',
  EMAIL: '이메일주소',
  CODE: '인증번호 입력',
};

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface FormData {
  name: string;
  email: string;
  verificationCode?: string;
}

interface PasswordChangeFormData {
  newPassword: string;
  confirmPassword: string;
}

const PasswordChangeSection = () => {
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { success, error } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordChangeFormData>({
    mode: 'onChange',
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data: PasswordChangeFormData) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const _passwordData = {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      // TODO: 실제 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 1000));

      success('비밀번호가 변경되었습니다.');
      router.push('/auth/login');
    } catch (e) {
      error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      setSubmitError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordValid = PASSWORD_REGEX.test(newPassword || '');
  const isPasswordMatch = newPassword === confirmPassword;

  return (
    <>
      <header className="mb-8 text-center">
        <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
          비밀번호 변경
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          새로운 비밀번호를 변경해주세요.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          type="password"
          placeholder="8~15자의 영문 대소문자, 숫자, 특수문자 포함"
          label="새 비밀번호"
          inputSize="md"
          error={
            errors.newPassword?.message ||
            (newPassword && !isPasswordValid
              ? '영어대소문자 숫자 특수문자를 포함한 8자리 이상으로 입력해주세요'
              : false)
          }
          success={
            newPassword && isPasswordValid && !errors.newPassword
              ? '비밀번호가 충족되었습니다'
              : false
          }
          required
          {...register('newPassword', {
            required: '새 비밀번호를 입력해주세요',
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다',
            },
            maxLength: {
              value: 15,
              message: '비밀번호는 15자 이하여야 합니다',
            },
            pattern: {
              value: PASSWORD_REGEX,
              message: '영문 대소문자, 숫자, 특수문자를 포함해야 합니다',
            },
          })}
        />

        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          label="새 비밀번호 확인"
          inputSize="md"
          error={
            errors.confirmPassword?.message ||
            (confirmPassword && !isPasswordMatch
              ? '비밀번호를 다시 확인해주세요'
              : false)
          }
          success={
            confirmPassword && isPasswordMatch && !errors.confirmPassword
              ? '비밀번호가 확인되었습니다'
              : false
          }
          required
          {...register('confirmPassword', {
            required: '비밀번호 확인을 입력해주세요',
            validate: (value) =>
              value === newPassword || '비밀번호가 일치하지 않습니다',
          })}
        />

        {submitError && (
          <div className="text-center text-sm text-red-400">{submitError}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={`w-full text-white ${
            isValid && isPasswordValid && isPasswordMatch
              ? 'bg-primary-500 hover:bg-primary-600 cursor-pointer'
              : 'cursor-not-allowed bg-gray-300'
          }`}
          disabled={
            !isValid || !isPasswordValid || !isPasswordMatch || isSubmitting
          }
        >
          {isSubmitting ? '처리 중...' : '확인'}
        </Button>
      </form>
    </>
  );
};

export default function FindPasswordPage() {
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
  const [isCodeSent, setCodeSent] = useState(false);
  const [isVerified, setVerified] = useState(false);

  const { emailRules } = useEmailValidation();
  const { toasts, success, error } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const name = watch('name');
  const email = watch('email');
  const verificationCode = watch('verificationCode');

  const sendCode = () => {
    if (!name?.trim()) return error('이름을 입력해주세요');
    if (!emailRules.pattern.value.test(email || '')) {
      return error(emailRules.pattern.message);
    }

    success('인증번호가 전송되었습니다!');
    setCodeSent(true);
    setVerified(false);
  };

  const verifyCode = () => {
    if (!verificationCode?.trim()) return error('인증번호를 입력해주세요');
    success('인증번호가 확인되었습니다!');
    setVerified(true);
  };

  const onSubmit = (data: FormData) => {
    setIsPasswordChangeVisible(true);
  };

  return (
    <>
      <Toast toasts={toasts} />
      <div className="inner">
        <Grid className="pt-20 pb-30">
          <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
            {isPasswordChangeVisible ? (
              <PasswordChangeSection />
            ) : (
              <>
                <header className="text-center">
                  <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
                    비밀번호 찾기
                  </h1>
                </header>
                <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
                  <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      이름 <span className="text-primary-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder={PLACEHOLDER.NAME}
                      inputSize="md"
                      variant={errors.name ? 'error' : 'default'}
                      {...register('name', { required: '이름을 입력해주세요' })}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      이메일주소 <span className="text-primary-500">*</span>
                    </label>
                    <div
                      className={`grid w-full ${FORM_LAYOUT.COLUMNS} gap-x-2 gap-y-3`}
                    >
                      <div>
                        <Input
                          type="email"
                          placeholder={PLACEHOLDER.EMAIL}
                          inputSize="md"
                          variant={errors.email ? 'error' : 'default'}
                          {...register('email', emailRules)}
                          required
                        />
                      </div>
                      <div className="flex items-start">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="h-fit w-full font-semibold whitespace-nowrap"
                          onClick={sendCode}
                        >
                          인증번호 전송
                        </Button>
                      </div>
                    </div>

                    {isCodeSent && (
                      <div
                        className={`mt-3 grid w-full ${FORM_LAYOUT.COLUMNS} gap-x-2 gap-y-3`}
                      >
                        <div>
                          <Input
                            type="text"
                            placeholder={PLACEHOLDER.CODE}
                            inputSize="md"
                            variant={
                              errors.verificationCode ? 'error' : 'default'
                            }
                            {...register('verificationCode', {
                              required: '인증번호를 입력해주세요',
                            })}
                          />
                        </div>
                        <div className="flex items-start">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="h-fit w-full font-semibold whitespace-nowrap"
                            onClick={verifyCode}
                          >
                            인증번호 확인
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className={`bg-primary-500 hover:bg-primary-600 w-full text-white ${
                      !isVerified ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    disabled={!isVerified}
                  >
                    확인
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/auth/find-id"
                    className="hover:text-primary-500 text-sm text-gray-600"
                  >
                    아이디를 잊으셨나요?
                  </Link>
                </div>
              </>
            )}
          </Grid.Item>
        </Grid>
      </div>
    </>
  );
}
