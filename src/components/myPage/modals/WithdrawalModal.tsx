'use client';

import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import Modal from '@/components/common/modal/Modal';
import { useState } from 'react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const withdrawalReasons = [
  { label: '선택', value: '' },
  { label: '콘텐츠가 부족해요', value: 'lack_of_content' },
  { label: '사용이 불편해요', value: 'inconvenient_ui' },
  { label: '자주 사용하지 않아요', value: 'not_using' },
  { label: '다른 서비스로 이동', value: 'moved_to_other' },
];

export default function WithdrawalModal({
  isOpen,
  onClose,
  userName,
}: WithdrawalModalProps) {
  const [selectedReason, setSelectedReason] = useState('');

  const handleWithdraw = () => {
    if (!selectedReason) {
      alert('탈퇴 사유를 선택해주세요.');
      return;
    }
    console.log('탈퇴 요청', { selectedReason });
    setSelectedReason('');
    onClose();
  };

  return (
    <Modal
      modalId="deleteMemberModal"
      isOpen={isOpen}
      onClose={onClose}
      className="w-[480px]"
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
            잠깐만 시간을 내어 사유를 알려주시면 참고하여 개선에 반영하겠습니다.
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
        <p className="text-xs text-gray-400">
          * 탈퇴 시 회원님의 모든 콘텐츠와 기록이 삭제됩니다.
        </p>
        <Button onClick={handleWithdraw} className="w-full">
          확인
        </Button>
      </div>
    </Modal>
  );
}
