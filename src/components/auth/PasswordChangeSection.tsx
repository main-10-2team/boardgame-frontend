'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface PasswordChangeFormData {
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeSectionProps {
  isLoading: boolean;
  onChangePassword: (newPassword: string) => Promise<boolean>;
}

const PasswordChangeSection = ({
  isLoading,
  onChangePassword,
}: PasswordChangeSectionProps) => {
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

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

    const success = await onChangePassword(data.newPassword);

    if (success) {
      router.push('/auth/login');
    } else {
      setSubmitError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const isPasswordValid = PASSWORD_REGEX.test(newPassword || '');
  const isPasswordMatch = newPassword === confirmPassword;
  const isFormValid = isValid && isPasswordValid && isPasswordMatch;

  return (
    <>
      <header className="mb-8 text-center">
        <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
          비밀번호 변경
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          새로운 비밀번호를 입력해주세요.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          type="password"
          placeholder="8~15자의 영문 대소문자, 숫자, 특수문자 포함"
          label="새 비밀번호"
          inputSize="md"
          disabled={isLoading}
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
          disabled={isLoading}
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
            isFormValid && !isLoading
              ? 'bg-primary-500 hover:bg-primary-600 cursor-pointer'
              : 'cursor-not-allowed bg-gray-300'
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? '변경 중...' : '비밀번호 변경'}
        </Button>
      </form>
    </>
  );
};

export default PasswordChangeSection;
