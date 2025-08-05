'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/modal/Modal';
import { useState } from 'react';

interface PhoneChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhoneChangeModal({
  isOpen,
  onClose,
}: PhoneChangeModalProps) {
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [confirmNum, setConfirmNum] = useState('');

  const handlePhoneChange = () => {
    if (!name || !phoneNum || !confirmNum) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    // console.log({ name, phoneNum, confirmNum });
    onClose();
  };

  return (
    <Modal
      modalId="phoneModal"
      isOpen={isOpen}
      onClose={onClose}
      className="w-[480px]"
    >
      <div className="flex flex-col gap-6">
        <div className="text-xl font-bold">휴대폰 번호 변경</div>
        <Input
          label="이름 입력"
          inputSize="md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            휴대폰 번호<span className="ml-0.5 text-pink-500">*</span>
          </label>
          <div className="mb-3 grid w-full grid-cols-[2fr_1fr] gap-x-2 gap-y-3">
            <Input
              type="text"
              placeholder="휴대폰번호 입력"
              value={phoneNum}
              inputSize="md"
              onChange={(e) => setPhoneNum(e.target.value)}
              required
            />
            <Button
              size="sm"
              variant="secondary"
              className="w-full font-semibold whitespace-nowrap"
            >
              인증번호 전송
            </Button>
            <Input
              type="text"
              placeholder="인증번호 입력"
              value={confirmNum}
              inputSize="md"
              onChange={(e) => setConfirmNum(e.target.value)}
              required
            />
            <Button
              size="sm"
              variant="secondary"
              className="w-full font-semibold whitespace-nowrap"
            >
              인증 확인
            </Button>
          </div>
        </div>
        <Button onClick={handlePhoneChange} className="w-full">
          확인
        </Button>
      </div>
    </Modal>
  );
}
