import { CATEGORY_MENU_ITEMS } from '@/constants/category/menuItems';
import Link from 'next/link';

export default function CategoryMenu() {
  return (
    <nav className="hidden gap-6 text-sm font-semibold lg:flex">
      {CATEGORY_MENU_ITEMS.map((item, i) => (
        <Link key={i} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
