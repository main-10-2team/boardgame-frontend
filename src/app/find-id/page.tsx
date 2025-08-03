'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Link from 'next/link';

export default function FindIdPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleSendCode = () => {
    if (name && phone) {
      console.log('인증번호 전송:', { name, phone });
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
      console.log('아이디 찾기 완료:', { name, phone, verificationCode });
      // 실제로는 아이디 결과 표시
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="inner pt-20">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <header className="text-center">
              <h1 className="text-2xl leading-[49px] font-extrabold text-gray-900">
                아이디 찾기
              </h1>
            </header>

            <form onSubmit={handleSubmit}>
              <div className="mb-0" style={{ paddingTop: '32px' }}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  닉네임 <span className="text-pink-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="닉네임 입력"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  inputSize="md"
                  variant="default"
                  required
                />
              </div>

              <div className="mb-0" style={{ marginTop: '32px' }}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  휴대폰 번호 <span className="text-pink-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="tel"
                      placeholder="휴대폰 번호"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      className="h-11 w-full items-center justify-center leading-none"
                      onClick={handleSendCode}
                      disabled={!name || !phone || isCodeSent}
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
                        className="flex h-11 w-full items-center justify-center leading-none"
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
                  아이디 찾기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
