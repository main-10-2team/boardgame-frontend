'use client';

import Button from '@/components/common/Button';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/utils/cn';
import {
  RiArrowRightSLine,
  RiCloseLine,
  RiMenuLine,
  RiUserLine,
} from '@remixicon/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: '보드큐 소개', href: '/introduce' },
  { label: '오늘 뭐하지', href: '/recommend' },
  { label: '보드게임 찾기', href: '/search' },
];

export default function MobileMenu() {
  // 메뉴바 상태
  const [isOpen, setIsOpen] = useState(false);
  // 메뉴바 닫기 함수
  const handleClose = () => setIsOpen(false);
  // esc 클릭 시 메뉴바 닫힘
  useEscapeKey(handleClose);

  // 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="cursor-pointer text-2xl lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <RiMenuLine />
      </div>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={handleClose}
        />
      )}
      {/* 슬라이드 메뉴 */}
      <aside
        className={cn(
          `fixed top-0 right-0 z-50 h-full w-64 transform bg-white font-medium shadow transition-transform duration-300 lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`
        )}
      >
        <div className="flex h-full flex-col gap-4 p-6">
          <div className="mb-2 flex items-center justify-between">
            <div className={cn('flex items-center gap-1 px-0')}>
              <RiUserLine size={20} />
              <Link href="/login" className="ml-2">
                로그인
              </Link>
              <RiArrowRightSLine size={20} />
            </div>
            <div className="cursor-pointer" onClick={handleClose}>
              <RiCloseLine />
            </div>
          </div>
          <div className="flex flex-col">
            <Button
              className="bg-gray-400 text-white"
              variant="primary"
              size="md"
            >
              <Link href="/signup">회원가입</Link>
            </Button>
          </div>
          <div className="my-1 border border-gray-200"></div>

          {/* 메뉴 항목들 */}
          {menuItems.map(({ label, href }, index) => (
            <div key={index}>
              <Link href={href} onClick={handleClose}>
                {label}
              </Link>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
