import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header/Header';
import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import ConditionalFooter from '@/components/layout/ConditionalFooter';

export const metadata: Metadata = {
  title: '보드큐',
  description: '지금 당장 플레이할 보드게임을 보드큐에서 찾아보세요!',
  keywords: ['보드게임', '보드큐', '게임 추천'],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`flex min-h-screen flex-col antialiased`}>
        <Providers>
          <Header />
          {children}
          <ConditionalFooter />
          <div id="modal" />
        </Providers>
      </body>
    </html>
  );
}
