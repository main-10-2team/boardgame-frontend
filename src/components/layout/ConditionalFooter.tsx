// components/layout/ConditionalFooter.tsx
'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

const HIDE_FOOTER_PAGES = [
  '/auth/login',
  '/auth/signup',
  '/preference',
  '/today',
];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hideFooter = HIDE_FOOTER_PAGES.includes(pathname);

  return !hideFooter ? <Footer /> : null;
}
