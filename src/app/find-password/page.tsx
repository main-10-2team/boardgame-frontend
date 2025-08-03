'use client';

import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import Link from 'next/link';
import { useEmailValidation } from '@/hooks/useEmailValidation';

interface FindPasswordFormData {
  name: string;
  email: string;
  verificationCode: string;
}

export default function FindPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormData>({
    mode: 'onChange',
  });

  const { emailRules } = useEmailValidation();

  const onSubmit = (_data: FindPasswordFormData) => {
    // TODO: 비밀번호 찾기 API 호출
  };

  return (
    <div className="inner">
      <Grid className="pt-20 pb-30">
        <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
          <header className="mb-8 text-center">
            <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
              비밀번호 찾기
            </h1>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Input
              type="text"
              placeholder="이름 입력"
              label="이름"
              inputSize="md"
              required
              error={errors.name?.message}
              {...register('name', { required: '이름을 입력해주세요' })}
            />

            <div className="space-y-3">
              <div className="grid w-full grid-cols-[2fr_1fr] gap-x-2">
                <Input
                  type="email"
                  placeholder="이메일주소"
                  label="이메일주소"
                  inputSize="md"
                  required
                  error={errors.email?.message}
                  {...register('email', emailRules)}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-6 h-11 w-full font-semibold whitespace-nowrap"
                >
                  인증번호 전송
                </Button>
              </div>

              <div className="grid w-full grid-cols-[2fr_1fr] gap-x-2">
                <Input
                  type="text"
                  placeholder="인증번호 입력"
                  inputSize="md"
                  error={errors.verificationCode?.message}
                  {...register('verificationCode', {
                    required: '인증번호를 입력해주세요',
                    minLength: {
                      value: 6,
                      message: '인증번호는 6자리입니다',
                    },
                  })}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-11 w-full font-semibold whitespace-nowrap"
                >
                  인증 확인
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              비밀번호 찾기
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/find-id"
              className="hover:text-primary-500 text-sm text-gray-600"
            >
              아이디를 잊으셨나요?
            </Link>
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
}
