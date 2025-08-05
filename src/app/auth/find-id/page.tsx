'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import Link from 'next/link';
import { Toast } from '@/components/common/Toast';
import { useToast } from '@/hooks/useToast';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';

const FORM_LAYOUT = {
  COLUMNS: 'grid-cols-[2fr_1fr]',
  SIZE: 'md',
};

const PLACEHOLDER = {
  NAME: '이름 입력',
  PHONE: '휴대폰 번호',
  CODE: '인증번호 입력',
};

interface FormData {
  name: string;
  phone: string;
  verificationCode?: string;
}

const ResultSection = ({ email }: { email: string }) => (
  <div>
    <h1 className="mb-2 text-center text-2xl font-bold">아이디 찾기</h1>
    <p className="mb-6 text-center text-gray-600">
      입력하신 정보로 가입한 아이디입니다.
    </p>
    <div className="mb-10 rounded-md bg-gray-100 py-4 text-center">
      <p className="text-lg font-medium">{email}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Link href="/login" className="w-full">
        <Button type="button" variant="secondary" size="lg" className="w-full">
          로그인
        </Button>
      </Link>
      <Link href="/find-password" className="w-full">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="bg-primary-500 hover:bg-primary-600 w-full text-white"
        >
          비밀번호 찾기
        </Button>
      </Link>
    </div>
  </div>
);

export default function FindIdPage() {
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isCodeSent, setCodeSent] = useState(false);
  const [isVerified, setVerified] = useState(false);

  const { phoneRules, convertToInternational } = usePhoneValidation();
  const { toasts, success, error } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const name = watch('name');
  const phone = watch('phone');
  const verificationCode = watch('verificationCode');

  const sendCode = () => {
    if (!name?.trim()) return error('이름을 입력해주세요');
    if (!phoneRules.pattern.value.test(phone?.replace(/[^0-9]/g, '') || '')) {
      return error(phoneRules.pattern.message);
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
    // 실제 API 호출 시 사용할 데이터
    const _formData = {
      name: data.name,
      phone: convertToInternational(data.phone),
      verificationCode: data.verificationCode,
    };

    // TODO: API 호출 로직 구현
    // const result = await findUserIdByPhone(_formData);

    setEmail('2팀@미쳐따아.dev');
    setIsResultVisible(true);
  };

  return (
    <>
      <Toast toasts={toasts} />
      <div className="inner">
        <Grid className="pt-20 pb-30">
          <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
            {isResultVisible ? (
              <ResultSection email={email} />
            ) : (
              <>
                <header className="text-center">
                  <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
                    아이디 찾기
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
                      휴대폰 번호 <span className="text-primary-500">*</span>
                    </label>
                    <div
                      className={`grid w-full ${FORM_LAYOUT.COLUMNS} gap-x-2 gap-y-3`}
                    >
                      <div>
                        <Input
                          type="tel"
                          placeholder={PLACEHOLDER.PHONE}
                          inputSize="md"
                          variant={errors.phone ? 'error' : 'default'}
                          {...register('phone', phoneRules)}
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
                    className={`bg-primary-500 hover:bg-primary-600 w-full text-white ${!isVerified ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={!isVerified}
                  >
                    아이디 찾기
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <Link
                    href="/find-password"
                    className="hover:text-primary-500 text-sm text-gray-600"
                  >
                    비밀번호를 잊으셨나요?
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
