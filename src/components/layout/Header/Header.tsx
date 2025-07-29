import { AuthButtons } from '@/components/layout/Header/AuthButtons';
import CategoryMenu from '@/components/layout/Header/CategoryMenu';
import Logo from '@/components/layout/Header/Logo';
import MobileMenu from '@/components/layout/Header/MobileMenu';
import { SearchInput } from '@/components/layout/Header/SearchInput';
import { RiSearchLine } from '@remixicon/react';

export default function Header() {
  return (
    <header className="relative z-50 bg-white whitespace-nowrap shadow">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <Logo />
        <div className="hidden w-full items-center justify-between gap-6 text-sm font-medium lg:ml-10 lg:flex">
          <CategoryMenu />
          <div className="items-center gap-8 lg:flex">
            <SearchInput />
            <AuthButtons />
          </div>
        </div>
        <div className="flex cursor-pointer gap-6 lg:hidden">
          <RiSearchLine />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
