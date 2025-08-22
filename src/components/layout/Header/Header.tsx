import { AuthButtons } from '@/components/layout/Header/AuthButtons';
import CategoryMenu from '@/components/layout/Header/CategoryMenu';
import Logo from '@/components/layout/Header/Logo';
import MobileMenu from '@/components/layout/Header/MobileMenu';
import { SearchInput } from '@/components/layout/Header/SearchInput';
import { UserMenu } from '@/components/layout/Header/UserMenu';
import { getUser } from '@/lib/auth';
import { MobileSearchIcon } from './MobileSearchIcon';

export const dynamic = 'force-dynamic';

export default async function Header() {
  const user = await getUser();

  return (
    <header className="relative z-50 bg-white whitespace-nowrap shadow">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between px-8 py-4">
        <Logo />
        <div className="hidden w-full items-center justify-between gap-6 text-sm font-medium lg:ml-10 lg:flex">
          <CategoryMenu />
          <div className="items-center gap-8 lg:flex">
            <SearchInput />
            {user ? <UserMenu user={user} /> : <AuthButtons />}
          </div>
        </div>
        <div className="flex gap-6 lg:hidden">
          <MobileSearchIcon />
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
}
