'use client';

import { useActionState, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import Link from 'next/link';
import { Toast } from '@/components/common/Toast';
import { useToast } from '@/hooks/useToast';
import { findUserId, FindIdState } from '@/actions/auth';

const initialState: FindIdState = {
  success: false,
  error: null,
};

const ResultSection = ({ email }: { email: string }) => {
  // 공통 버튼 스타일
  const baseButtonClass =
    'w-full text-lg px-5.5 py-3.5 rounded-md text-center inline-flex items-center justify-center font-medium transition-colors';
  const primaryButtonClass = `${baseButtonClass} bg-primary-400 text-white shadow-md hover:bg-primary-500`;

  return (
    <div>
      <h1 className="mb-2 text-center text-2xl font-bold">아이디 찾기</h1>
      <p className="mb-6 text-center text-gray-600">
        입력하신 정보로 가입한 아이디입니다.
      </p>
      <div className="mb-10 rounded-md bg-gray-100 py-4 text-center">
        <p className="text-lg font-medium">{email}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/auth/login"
          className={`${baseButtonClass} border border-gray-200 bg-white text-black shadow-md hover:bg-gray-50`}
        >
          로그인
        </Link>
        <Link href="/auth/find-password" className={primaryButtonClass}>
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default function FindIdPage() {
  const [state, formAction, isPending] = useActionState(
    findUserId,
    initialState
  );
  const { toasts, success, error } = useToast();
  const [lastError, setLastError] = useState<string | null>(null);

  // 에러 발생 시 토스트로 표시 (한 번만)
  useEffect(() => {
    if (state.error && state.error !== lastError) {
      error(state.error);
      setLastError(state.error);
    }
  }, [state.error, lastError, error]);

  // 성공 시 결과 화면 표시
  if (state.success && state.email) {
    return (
      <>
        <Toast toasts={toasts} />
        <div className="inner">
          <Grid className="pt-20 pb-30">
            <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
              <ResultSection email={state.email} />
            </Grid.Item>
          </Grid>
        </div>
      </>
    );
  }

  // 기본 폼 화면
  return (
    <>
      <Toast toasts={toasts} />
      <div className="inner">
        <Grid className="pt-20 pb-30">
          <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
            <header className="text-center">
              <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
                아이디 찾기
              </h1>
            </header>

            <form action={formAction} className="pt-8">
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  이름 <span className="text-primary-500">*</span>
                </label>
                <Input
                  name="name"
                  type="text"
                  placeholder="이름 입력"
                  inputSize="md"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  휴대폰 번호 <span className="text-primary-500">*</span>
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="휴대폰 번호"
                  inputSize="md"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="bg-primary-400 hover:bg-primary-600 w-full text-white"
                disabled={isPending}
              >
                {isPending ? '아이디 찾는 중...' : '아이디 찾기'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/find-password"
                className="hover:text-primary-500 text-sm text-gray-600"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </Grid.Item>
        </Grid>
      </div>
    </>
  );
}
