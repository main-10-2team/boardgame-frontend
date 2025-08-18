'use client';

import { logout } from '@/actions/auth';
import PasswordConfirmModal from '@/app/my-page/profile/_components/PasswordConfirmModal';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import Modal from '@/components/common/modal/Modal';
import { useDeleteUser } from '@/hooks/react-query/useDeleteUser';
import { useState } from 'react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const withdrawalReasons = [
  { label: '선택', value: '' },
  { label: '서비스에 만족하지 않음', value: 'DISSATISFIED' },
  { label: '원하는 기능이 존재하지 않음', value: 'NO_FEATURES' },
  { label: '사용에 불편함이 있거나 오류가 많음', value: 'TOO_MANY_ERRORS' },
  { label: '더 이상 사용할 일이 없음', value: 'NO_LONGER_NEEDED' },
  { label: '계정을 중복으로 생성함', value: 'DUPLICATE_ACCOUNT' },
  { label: '기타 (직접 입력)', value: 'OTHER' },
];

export default function WithdrawalModal({
  isOpen,
  onClose,
  userName,
}: WithdrawalModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalText, setAdditionalText] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleWithdraw = () => {
    if (!selectedReason) {
      alert('탈퇴 사유를 선택해주세요.');
      return;
    }

    setIsPasswordModalOpen(true);
  };

  const { mutate: deleteUserMutate } = useDeleteUser();
  const handleConfirmPassword = (password: string) => {
    deleteUserMutate(
      {
        password,
        reason: selectedReason,
        additional_text:
          selectedReason === 'OTHER' ? additionalText : undefined,
      },
      {
        onSuccess: async () => {
          alert('회원 탈퇴가 완료되었습니다.');
          await logout();
          onClose();
        },
        onError: (error: unknown) => {
          alert('탈퇴에 실패했습니다. 비밀번호를 확인해주세요.');
          console.error(error);
        },
      }
    );

    // 초기화 및 모달 닫기
    setSelectedReason('');
    setAdditionalText('');
    setIsPasswordModalOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        modalId="deleteMemberModal"
        isOpen={isOpen}
        onClose={onClose}
        className="w-full max-w-[480px]"
      >
        <div className="flex flex-col gap-8">
          <div className="text-xl font-semibold">회원 탈퇴</div>
          <div>
            <p className="mb-3 text-base leading-relaxed font-medium text-gray-600">
              <span className="text-gray-900">{userName}</span>님, 그동안 함께해
              주셔서 감사드립니다.
            </p>
            <p className="text-sm font-normal text-gray-600">
              더 나은 서비스를 위해 탈퇴하시려는 이유를 들려주실 수 있을까요?
              <br />
              잠깐만 시간을 내어 사유를 알려주시면 참고하여 개선에
              반영하겠습니다.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">탈퇴 사유</label>
            <Dropdown
              options={withdrawalReasons}
              selectedValue={selectedReason}
              onChange={setSelectedReason}
              size="full"
            />
          </div>
          {selectedReason === 'OTHER' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-black">
                기타 사유
              </label>
              <textarea
                className="h-[100px] w-full resize-none rounded-lg border border-gray-400 px-4 py-2"
                value={additionalText}
                onChange={(e) => setAdditionalText(e.target.value)}
                placeholder="기타 사유를 입력해주세요"
              />
            </div>
          )}
          <p className="text-xs text-gray-400">
            * 탈퇴 시 회원님의 모든 콘텐츠와 기록이 삭제됩니다.
          </p>
          <Button onClick={handleWithdraw} className="w-full">
            확인
          </Button>
        </div>
      </Modal>
      <PasswordConfirmModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handleConfirmPassword}
      />
    </>
  );
}
