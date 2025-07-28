import { AuthButtons } from '@/components/layout/Header/AuthButtons';
import CategoryMenu from '@/components/layout/Header/CategoryMenu';
import Logo from '@/components/layout/Header/Logo';
import MobileMenu from '@/components/layout/Header/MobileMenu';
import { SearchInput } from '@/components/layout/Header/SearchInput';
import { RiSearchLine } from '@remixicon/react';

export default function Header() {
  return (
    <header className="relative z-50 bg-white shadow whitespace-nowrap">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-8 py-4">
        <Logo />
        <div className="items-center justify-between hidden w-full gap-6 text-sm font-medium lg:flex lg:ml-10">
          <CategoryMenu />
          <div className="items-center gap-8 lg:flex">
            <SearchInput />
            <AuthButtons />
          </div>
        </div>
        <div className="flex gap-6 cursor-pointer lg:hidden">
          <RiSearchLine />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
