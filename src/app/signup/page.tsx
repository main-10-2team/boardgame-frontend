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

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSocialLogin = (provider: 'kakao' | 'naver') => {};

  return (
    <div className="inner">
      <Grid className="pt-20 pb-30">
        <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
          <header className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center">
              <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
                회원가입
              </h1>
            </div>
            <p className="text-sm leading-[140%] font-normal tracking-tight text-gray-600">
              함께하수록 더 재밌는 보드큐, 지금 시작해보세요.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="mb-8 space-y-8">
            <div className="space-y-3">
              <Input
                type="name"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputSize="md"
                variant="default"
                label="이름"
                required
                className="mb-6"
              />
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputSize="md"
                variant="default"
                label="이메일"
                required
                className="mb-6"
              />
              <Input
                type="text"
                placeholder="2~20자 한글 또는 영문"
                value={nickname}
                onChange={(e) => setNickName(e.target.value)}
                inputSize="md"
                variant="default"
                label="닉네임"
                required
                className="mb-6"
              />
              <Input
                type="phone"
                placeholder="- 빼고 입력해주세요."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputSize="md"
                variant="default"
                label="핸드폰 번호"
                required
                className="mb-6"
              />
              <Input
                type="birth"
                placeholder="생년월일 입력해"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                inputSize="md"
                variant="default"
                label="생년월일"
                required
                className="mb-6"
              />

              <Input
                type="password"
                placeholder="8자 이상의 비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputSize="md"
                variant="default"
                label="비밀번호"
                required
              />
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                inputSize="md"
                variant="default"
                className="mb-6"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
            >
              가입하기
            </Button>
          </form>
        </Grid.Item>
      </Grid>
    </div>
  );
}
