'use client';

import Button from '@/components/common/Button';
import PasswordChangeModal from '@/components/myPage/modals/PasswordChangeModal';
import PhoneChangeModal from '@/components/myPage/modals/PhoneChangeModal';
import { User } from '@/types/user/user';
import { useState } from 'react';

interface ProfileInfoSectionprops {
  user: User;
}

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
          010-1234-5678
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

        <span className="text-gray-600">성별</span>
        <span>남자</span>

        <span className="text-gray-600">생년월일</span>
        <span>2000.00.00</span>
      </div>
    </>
  );
}
