'use client';

import Button from '@/components/common/Button';
import PasswordChangeModal from '@/components/my-page/modals/PasswordChangeModal';
import PhoneChangeModal from '@/components/my-page/modals/PhoneChangeModal';
import { User } from '@/types/user/user';
import { useState } from 'react';

interface ProfileInfoSectionprops {
  user: User;
}

export const convertToLocalPhone = (phone: string) => {
  if (phone.startsWith('+82')) {
    const local = '0' + phone.slice(3); // +82 → 0
    if (local.length === 11) {
      return local.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    if (local.length === 10) {
      return local.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    }
    return local;
  }
  return phone;
};

export default function ProfileInfoSection({ user }: ProfileInfoSectionprops) {
  const [modals, setModals] = useState({
    pwd: false,
    phone: false,
  });

  return (
    <>
      {/* 기본 정보 영역 */}
      <h2 className="text-2xl font-semibold">기본 정보</h2>
      <div className="grid grid-cols-[1fr_3fr] items-center gap-x-2 gap-y-6 text-sm whitespace-nowrap">
        <span className="text-gray-600">이름</span>
        <span className="font-medium">{user.name}</span>
        {/* 비밀번호 변경 모달 */}
        <span className="text-gray-600">비밀번호</span>
        <span>
          <Button
            onClick={() => setModals((prev) => ({ ...prev, pwd: true }))}
            size="sm"
            variant="secondary"
            className="font-semibold"
          >
            비밀번호 변경
          </Button>
          <PasswordChangeModal
            isOpen={modals.pwd}
            onClose={() => setModals((prev) => ({ ...prev, pwd: false }))}
          />
        </span>

        {/* 휴대폰번호 변경 모달 */}
        <span className="text-gray-600">휴대폰 번호</span>
        <span className="flex items-center">
          {convertToLocalPhone(user.phone_number)}
          <Button
            onClick={() => setModals((prev) => ({ ...prev, phone: true }))}
            size="sm"
            variant="secondary"
            className="ml-3 w-fit font-semibold"
          >
            변경
          </Button>
          <PhoneChangeModal
            isOpen={modals.phone}
            onClose={() => setModals((prev) => ({ ...prev, phone: false }))}
          />
        </span>
        <span className="text-gray-600">생년월일</span>
        <span>{user.birth.replace(/-/g, '.')}</span>
      </div>
    </>
  );
}
