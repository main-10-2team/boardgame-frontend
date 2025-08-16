'use client';

import { logout } from '@/actions/auth';
import Button from '@/components/common/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { CATEGORY_MENU_ITEMS } from '@/constants/category/menuItems';
import { Z_INDEX } from '@/constants/zIndex';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import useScrollLock from '@/hooks/useScrollLock';
import { cn } from '@/utils/cn';
import {
  RiArrowRightSLine,
  RiCloseLine,
  RiMenuLine,
  RiUserLine,
} from '@remixicon/react';
import Link from 'next/link';
import { useState } from 'react';

interface MobileMenuProps {
  user: {
    nickname: string;
    profile_image?: string | null;
  } | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  // 메뉴바 상태
  const [isOpen, setIsOpen] = useState(false);
  // 메뉴바 닫기 함수
  const handleClose = () => setIsOpen(false);
  // esc 클릭 시 메뉴바 닫힘
  useEscapeKey(handleClose);

  // 스크롤 막기
  useScrollLock(isOpen);

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
          className="fixed inset-0 bg-black/50 lg:hidden"
          style={{ zIndex: Z_INDEX.MOBILE_MENU }}
          onClick={handleClose}
        />
      )}
      {/* 슬라이드 메뉴 */}
      <aside
        className={cn(
          `fixed top-0 right-0 h-full w-64 transform bg-white font-medium shadow transition-transform duration-300 lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`
        )}
        style={{ zIndex: Z_INDEX.MOBILE_MENU + 1 }}
      >
        <div className="flex h-full flex-col gap-4 p-6">
          {user ? (
            <div onClick={handleClose}>
              <div className="mb-2 flex items-center justify-between">
                <Link href={'/my-page/profile'}>
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={`https://boardq.o-r.kr/media/${user.profile_image}`}
                      alt="프로필"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-lg">{user.nickname}</span>
                  </div>
                </Link>
                <div className="cursor-pointer" onClick={handleClose}>
                  <RiCloseLine />
                </div>
              </div>

              <Link href={'/my-page'}>
                <Button className="mt-4 w-full">마이페이지</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-between">
                <Link href="/auth/login" onClick={handleClose}>
                  <div className="flex items-center">
                    <RiUserLine size={20} />
                    <span className="ml-2">로그인</span>
                    <RiArrowRightSLine size={20} />
                  </div>
                </Link>
                <div className="cursor-pointer" onClick={handleClose}>
                  <RiCloseLine />
                </div>
              </div>
              <div className="flex flex-col">
                <Button
                  className="bg-gray-400 text-white"
                  variant="primary"
                  size="md"
                  onClick={handleClose}
                >
                  <Link href="/auth/signup">회원가입</Link>
                </Button>
              </div>
            </>
          )}

          <div className="my-1 border border-gray-200"></div>

          {/* 메뉴 항목들 */}
          {CATEGORY_MENU_ITEMS.map(({ label, href }, index) => (
            <div key={index}>
              <Link href={href} onClick={handleClose}>
                {label}
              </Link>
            </div>
          ))}
          {user && (
            <div className="mt-auto flex">
              <form action="/logout" method="post">
                <Button
                  variant="transparent"
                  onClick={async () => {
                    await logout();
                    window.location.href = '/';
                  }}
                >
                  로그아웃
                </Button>
              </form>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
