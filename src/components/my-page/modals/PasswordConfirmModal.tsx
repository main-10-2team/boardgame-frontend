'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/modal/Modal';
import { useState } from 'react';

interface PasswordConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

export default function PasswordConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: PasswordConfirmModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    onConfirm(password);
    setPassword('');
    onClose();
  };

  return (
    <Modal
      modalId="passwordConfirmModal"
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[400px]"
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">비밀번호 확인</h2>
        <p className="text-sm text-gray-600">
          회원 탈퇴를 위해 비밀번호를 입력해주세요.
        </p>
        <input
          type="password"
          placeholder="비밀번호"
          className="rounded-md border border-gray-300 px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} className="w-full">
          탈퇴 요청
        </Button>
      </div>
    </Modal>
  );
}
