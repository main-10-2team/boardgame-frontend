'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/modal/Modal';
import { useUpdatePassword } from '@/hooks/react-query/useUpdatePassword';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
}: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const { passwordRules, confirmPasswordRules } = usePasswordValidation();
  const { mutate } = useUpdatePassword();

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        current_password: currentPassword,
        new_password: data.newPassword,
        new_password_confirm: data.confirmPassword,
      },
      {
        onSuccess: () => {
          alert('비밀번호가 변경되었습니다.');
          onClose();
        },
        onError: (error) => {
          console.error(error);
          alert(error.message || '비밀번호 변경에 실패했습니다.');
        },
      }
    );
  };

  return (
    <Modal
      modalId="passwordModal"
      isOpen={isOpen}
      onClose={onClose}
      className="w-[480px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
          inputSize="md"
          {...register('newPassword', passwordRules)}
          error={errors.newPassword?.message}
          required
        />
        <Input
          type="password"
          label="새 비밀번호 확인"
          inputSize="md"
          {...register(
            'confirmPassword',
            confirmPasswordRules(watch('newPassword'))
          )}
          error={errors.confirmPassword?.message}
          required
        />
        <Button type="submit" className="w-full">
          확인
        </Button>
      </form>
    </Modal>
  );
}
