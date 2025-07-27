'use client';

import { SearchInput } from '@/components/layout/Header/SearchInput';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileMenu({ isOpen, setIsOpen }: Props) {
  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 슬라이드 메뉴 */}
      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow z-50 transform transition-transform duration-300 font-medium lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-4 p-6">
          {/* 검색창 */}
          <SearchInput />
          <hr className="my-2 border-gray-200" />
          {/* 메뉴 항목들 */}
          <Link href="/introduce" onClick={() => setIsOpen(false)}>
            보드큐 소개
          </Link>
          <Link href="/recommend" onClick={() => setIsOpen(false)}>
            오늘 뭐하지
          </Link>
          <Link href="/search" onClick={() => setIsOpen(false)}>
            보드게임 찾기
          </Link>

          <hr className="my-2 border-gray-200" />

          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </aside>
    </>
  );
}
