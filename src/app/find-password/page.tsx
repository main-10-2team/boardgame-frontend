'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import Link from 'next/link';

export default function FindPasswordPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleSendCode = () => {
    if (email) {
      console.log('인증번호 전송:', { name, email });
      setIsCodeSent(true);
      // 실제로는 여기서 API 호출
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode) {
      console.log('인증번호 확인:', verificationCode);
      setIsCodeVerified(true);
      // 실제로는 여기서 API 호출
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCodeVerified) {
      console.log('비밀번호 찾기 완료:', { name, email, verificationCode });
      // 실제로는 비밀번호 재설정 페이지로 이동
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="inner pt-20">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <header className="text-center">
              <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
                비밀번호 찾기
              </h1>
            </header>

            <form onSubmit={handleSubmit}>
              <div className="mb-0" style={{ paddingTop: '32px' }}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  이름 <span className="text-pink-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="이름 입력"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  inputSize="md"
                  variant="default"
                  required
                />
              </div>

              <div className="mb-0" style={{ marginTop: '32px' }}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  이메일주소 <span className="text-pink-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="이메일주소"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputSize="md"
                      variant="default"
                      required
                    />
                  </div>
                  <div style={{ width: '140px' }}>
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={handleSendCode}
                      disabled={!name || !email || isCodeSent}
                    >
                      {isCodeSent ? '전송완료' : '인증번호 전송'}
                    </Button>
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="인증번호 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        inputSize="md"
                        variant="default"
                        required
                        disabled={!isCodeSent}
                      />
                    </div>
                    <div style={{ width: '140px' }}>
                      <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        className="w-full"
                        onClick={handleVerifyCode}
                        disabled={
                          !isCodeSent || !verificationCode || isCodeVerified
                        }
                      >
                        {isCodeVerified ? '인증완료' : '인증 확인'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={!isCodeVerified}
                >
                  비밀번호 찾기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
