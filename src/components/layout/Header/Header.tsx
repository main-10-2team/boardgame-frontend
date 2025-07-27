'use client';
import menuIcon from '@/assets/icons/menu.svg';
import Icon from '@/components/common/Icon';
import { AuthButtons } from '@/components/layout/Header/AuthButtons';
import CategoryMenu from '@/components/layout/Header/CategoryMenu';
import Logo from '@/components/layout/Header/Logo';
import MobileMenu from '@/components/layout/Header/MobileMenu';
import { SearchInput } from '@/components/layout/Header/SearchInput';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }
  // }, [isMenuOpen]);

  return (
    <header className="shadow bg-white relative z-50 whitespace-nowrap">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-8 py-4">
        <Logo />
        <div className="hidden lg:flex lg:ml-10 w-full gap-6 justify-between items-center text-sm font-medium">
          <CategoryMenu />
          <div className="lg:flex gap-8">
            <SearchInput />
            <AuthButtons />
          </div>
        </div>
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <Icon icon={menuIcon} size={24} />
        </button>
      </div>
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </header>
  );
}
