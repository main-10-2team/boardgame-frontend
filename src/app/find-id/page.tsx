'use client';

import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import Link from 'next/link';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';

interface FindIdFormData {
  name: string;
  phone: string;
  verificationCode: string;
}

export default function FindIdPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FindIdFormData>({
    mode: 'onChange',
  });

  const { nicknameRules } = useNicknameValidation();
  const { phoneRules, convertToInternational } = usePhoneValidation();

  const phone = watch('phone');

  const onSubmit = (data: FindIdFormData) => {
    const convertedData = {
      ...data,
      phone: convertToInternational(data.phone),
    };
    console.log('아이디 찾기 데이터:', convertedData);
    // TODO: 아이디 찾기 API 호출
  };

  return (
    <div className="inner">
      <Grid className="pt-20 pb-30">
        <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
          <header className="text-center">
            <h1 className="text-center text-2xl leading-[49px] font-extrabold text-gray-900">
              아이디 찾기
            </h1>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-0" style={{ paddingTop: '32px' }}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                이름 <span className="text-pink-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="이름 입력"
                inputSize="md"
                variant={errors.name ? 'error' : 'default'}
                {...register('name', nicknameRules)}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-0" style={{ marginTop: '32px' }}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                휴대폰 번호 <span className="text-pink-500">*</span>
              </label>
              <div className="mb-8 grid w-full grid-cols-[2fr_1fr] gap-x-2 gap-y-3">
                <div>
                  <Input
                    type="tel"
                    placeholder="휴대폰 번호"
                    inputSize="md"
                    variant={errors.phone ? 'error' : 'default'}
                    {...register('phone', phoneRules)}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                  {phone && !errors.phone && (
                    <p className="mt-1 text-xs text-blue-600">
                      변환될 형식: {convertToInternational(phone)}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-fit w-full font-semibold whitespace-nowrap"
                >
                  인증번호 전송
                </Button>
                <div>
                  <Input
                    type="text"
                    placeholder="인증번호 입력"
                    inputSize="md"
                    variant={errors.verificationCode ? 'error' : 'default'}
                    {...register('verificationCode', {
                      required: '인증번호를 입력해주세요',
                      minLength: {
                        value: 6,
                        message: '인증번호는 6자리입니다',
                      },
                    })}
                  />
                  {errors.verificationCode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.verificationCode.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-full font-semibold whitespace-nowrap"
                >
                  인증 확인
                </Button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                아이디 찾기
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/find-password"
              className="hover:text-primary-500 text-sm text-gray-600"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
}
