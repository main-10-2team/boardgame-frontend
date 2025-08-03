'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Icon from '@/components/common/Icon';
import Grid from '@/components/layout/Grid';
import LogoIcon from '@/assets/icons/logo.svg';
import KakaoIcon from '@/assets/icons/kakao.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import Link from 'next/link';

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
  { href: '/find-id', text: '아이디 찾기' },
  { href: '/find-password', text: '비밀번호 찾기' },
  { href: '/signup', text: '회원가입' },
] as const;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSocialLogin = (provider: 'kakao' | 'naver') => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Grid className="pt-20">
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

          <form onSubmit={handleSubmit} className="mb-6 space-y-8">
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputSize="md"
                variant="default"
                required
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputSize="md"
                variant="default"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
            >
              로그인
            </Button>
          </form>

          <nav className="mb-6 text-center">
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
            <p className="mb-4 text-sm text-gray-600">간편 로그인</p>
            <div className="space-y-3">
              {SOCIAL_LOGIN_BUTTONS.map((button) => (
                <button
                  key={button.id}
                  type="button"
                  onClick={() => handleSocialLogin(button.id)}
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
