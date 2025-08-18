'use client';

import WithdrawalModal from '@/app/my-page/profile/_components/WithdrawalModal';
import Button from '@/components/common/Button';
import { RiArrowRightSLine } from '@remixicon/react';
import { useState } from 'react';

export default function WithdrawalButton({ userName }: { userName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-5 flex justify-end">
      <Button
        onClick={() => setIsOpen(true)}
        variant="transparent"
        className="flex text-gray-600"
      >
        회원 탈퇴
        <RiArrowRightSLine />
      </Button>
      <WithdrawalModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userName={userName}
      />
    </div>
  );
}
