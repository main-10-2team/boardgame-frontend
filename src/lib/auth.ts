import { cookies } from 'next/headers';

export async function fetchUserInfo(token: string) {
  try {
    const res = await fetch('https://boardq.o-r.kr/api/v1/profile/', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) return null;
  return fetchUserInfo(token);
}
