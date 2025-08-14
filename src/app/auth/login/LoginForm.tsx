// src/app/auth/login/LoginForm.tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, LoginState } from '@/actions/auth';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Icon from '@/components/common/Icon';
import KakaoIcon from '@/assets/icons/kakao.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import Link from 'next/link';
import Grid from '@/components/layout/Grid';
import LogoIcon from '@/assets/icons/logo.svg';

const SOCIAL_LOGIN_BUTTONS = [
  {
    id: 'kakao',
    icon: KakaoIcon,
    text: '카카오 로그인',
    style: {
      backgroundColor: 'rgba(254, 229, 0, 1)',
      color: 'rgba(57, 28, 26, 1)',
    },
    hoverStyle: 'hover:brightness-95',
  },
  {
    id: 'naver',
    icon: NaverIcon,
    text: '네이버 로그인',
    style: {
      backgroundColor: 'rgba(3, 199, 90, 1)',
      color: 'white',
    },
    hoverStyle: 'hover:brightness-95',
  },
] as const;

const HELP_LINKS = [
  { href: '/auth/find-id', text: '아이디 찾기' },
  { href: '/auth/find-password', text: '비밀번호 찾기' },
  { href: '/auth/signup', text: '회원가입' },
] as const;

const initialState: LoginState = {
  success: false,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      className="w-full"
      disabled={pending}
    >
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    login,
    initialState
  );

  return (
    <div className="inner">
      <Grid className="pt-20 pb-30">
        <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
          <header className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center">
              <Icon icon={LogoIcon} size={24} className="mr-2" />
              <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
                보드큐
              </h1>
            </div>
            <p className="text-sm leading-[140%] font-normal tracking-tight text-gray-600">
              함께하수록 더 재밌는 보드큐, 지금 시작해보세요.
            </p>
          </header>

          <form action={formAction} className="mb-6 space-y-8">
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="이메일"
                name="email"
                inputSize="md"
                variant="default"
                required
              />
              <Input
                type="password"
                placeholder="비밀번호"
                name="password"
                inputSize="md"
                variant="default"
                required
              />
            </div>
            <SubmitButton />
            {state.error && (
              <p className="mt-2 text-sm text-red-500">{state.error}</p>
            )}
          </form>

          <nav className="mb-8 text-center">
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              {HELP_LINKS.map((link, index) => (
                <div key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-pink-500"
                  >
                    {link.text}
                  </Link>
                  {index < HELP_LINKS.length - 1 && (
                    <span className="ml-4">|</span>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <section className="text-center">
            <div className="mb-8 flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="whitespace-nowrap">간편 로그인</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>
            <div className="space-y-3">
              {SOCIAL_LOGIN_BUTTONS.map((button) => (
                <button
                  key={button.id}
                  type="button"
                  // onClick={() => handleSocialLogin(button.id)}
                  style={button.style}
                  className={`flex w-full items-center justify-center rounded-lg py-3 font-medium transition-all ${button.hoverStyle} `}
                >
                  <Icon icon={button.icon} size={20} className="mr-2" />
                  {button.text}
                </button>
              ))}
            </div>
          </section>
        </Grid.Item>
      </Grid>
    </div>
  );
}
