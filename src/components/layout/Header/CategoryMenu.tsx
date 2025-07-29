import Link from 'next/link';

const menuItems = [
  { label: '오늘 뭐하지', href: '/today' },
  { label: '보드큐 추천', href: '/recommend' },
  { label: '보드게임 찾기', href: '/search' },
];

export default function CategoryMenu() {
  return (
    <nav className="hidden gap-6 text-sm font-semibold lg:flex">
      {menuItems.map((item, i) => (
        <Link key={i} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
