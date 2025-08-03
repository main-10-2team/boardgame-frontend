'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/modal/Modal';
import { useState } from 'react';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
}: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log({ currentPassword, newPassword, confirmPassword });
    onClose();
  };

  return (
    <Modal
      modalId="passwordModal"
      isOpen={isOpen}
      onClose={onClose}
      className="w-[480px]"
    >
      <div className="flex flex-col gap-6">
        <div className="text-xl font-bold">비밀번호 변경</div>
        <Input
          type="password"
          label="기존 비밀번호"
          inputSize="md"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          label="새 비밀번호"
          value={newPassword}
          inputSize="md"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          label="새 비밀번호 확인"
          value={confirmPassword}
          inputSize="md"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={
            confirmPassword && confirmPassword !== newPassword
              ? '비밀번호가 일치하지 않습니다.'
              : false
          }
          success={
            confirmPassword && confirmPassword === newPassword
              ? '비밀번호가 일치합니다.'
              : false
          }
          required
        />
        <Button onClick={handlePasswordChange} className="w-full">
          확인
        </Button>
      </div>
    </Modal>
  );
}
