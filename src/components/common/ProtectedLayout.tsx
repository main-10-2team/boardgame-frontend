import { fetchUserInfo } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
  nextBase, // 페이지 경로
}: {
  children: React.ReactNode;
  nextBase: string;
}) {
  const cookieStore = await cookies();
  const access = cookieStore.get('access_token')?.value;

  if (!access) {
    console.log('no token, redirect');
    redirect(`/auth/login?next=${encodeURIComponent(nextBase)}`);
  }

  const me = await fetchUserInfo(access);
  console.log('user info >>>', me);

  if (!me) {
    console.log('fetchUserInfo failed, redirect');
    redirect(`/auth/login?next=${encodeURIComponent(nextBase)}`);
  }

  return <>{children}</>;
}
