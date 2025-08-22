'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const FORM_LAYOUT = {
  COLUMNS: 'grid-cols-[2fr_1fr]',
} as const;

const PLACEHOLDER = {
  NAME: '이름 입력',
  EMAIL: '이메일주소',
  CODE: '인증번호 입력',
} as const;

interface FormData {
  name: string;
  email: string;
  verificationCode?: string;
}

interface FindPasswordFormProps {
  isCodeSent: boolean;
  isVerified: boolean;
  isLoading: boolean;
  resetToken: string;
  onSendCode: (email: string, name: string) => Promise<boolean>;
  onVerifyCode: (email: string, verificationCode: string) => Promise<boolean>;
  onComplete: (data: {
    email: string;
    verificationCode: string;
    resetToken: string;
  }) => void;
}

const FindPasswordForm = ({
  isCodeSent,
  isVerified,
  isLoading,
  resetToken,
  onSendCode,
  onVerifyCode,
  onComplete,
}: FindPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const name = watch('name');
  const email = watch('email');
  const verificationCode = watch('verificationCode');

  const handleSendCode = async () => {
    await onSendCode(email, name);
  };

  const handleVerifyCode = async () => {
    await onVerifyCode(email, verificationCode || '');
  };

  const onSubmit = () => {
    onComplete({
      email,
      verificationCode: verificationCode || '',
      resetToken,
    });
  };

  return (
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
            disabled={isLoading}
            {...register('name', { required: '이름을 입력해주세요' })}
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            이메일주소 <span className="text-primary-500">*</span>
          </label>
          <div className={`grid w-full ${FORM_LAYOUT.COLUMNS} gap-x-2 gap-y-3`}>
            <Input
              type="email"
              placeholder={PLACEHOLDER.EMAIL}
              inputSize="md"
              variant={errors.email ? 'error' : 'default'}
              disabled={isLoading}
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식을 입력해주세요',
                },
              })}
              required
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-fit w-full font-semibold whitespace-nowrap"
              disabled={isLoading || !email || !name}
              onClick={handleSendCode}
            >
              {isLoading ? '전송 중...' : '인증번호 전송'}
            </Button>
          </div>

          {isCodeSent && (
            <div
              className={`mt-3 grid w-full ${FORM_LAYOUT.COLUMNS} gap-x-2 gap-y-3`}
            >
              <Input
                type="text"
                placeholder={PLACEHOLDER.CODE}
                inputSize="md"
                variant={errors.verificationCode ? 'error' : 'default'}
                disabled={isLoading}
                {...register('verificationCode', {
                  required: '인증번호를 입력해주세요',
                })}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-fit w-full font-semibold whitespace-nowrap"
                disabled={isLoading || !verificationCode}
                onClick={handleVerifyCode}
              >
                {isLoading ? '확인 중...' : '인증번호 확인'}
              </Button>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={`w-full text-white ${
            isVerified
              ? 'bg-primary-500 hover:bg-primary-600 cursor-pointer'
              : 'cursor-not-allowed bg-gray-300'
          }`}
          disabled={!isVerified || isLoading}
        >
          {isLoading ? '처리 중...' : '확인'}
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
  );
};

export default FindPasswordForm;
