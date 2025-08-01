'use client';

import { staticPaths } from '@/constants/category/breadcrumbs';
import { RiArrowRightSLine } from '@remixicon/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  const crumbs = [{ name: '홈', href: '/' }];

  // 1단계 메뉴 (pathname 기반)
  const root = staticPaths.find((path) => pathname.startsWith(path.path));
  if (root) {
    crumbs.push({ name: root.name, href: root.path });
  }

  // 2단계 메뉴 (쿼리 기반)
  if (genre) {
    crumbs.push({
      name: genre,
      href: `${pathname}?genre=${genre}`,
    });
  }

  return (
    <nav className="my-2 text-xs text-gray-500 md:text-sm">
      <ol className="flex items-center">
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <RiArrowRightSLine className="w-4 text-gray-400" />}
            <Link href={crumb.href} className="text-gray-700 hover:underline">
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
