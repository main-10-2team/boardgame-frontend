'use server';

// 서버 전용 유틸
export async function fetchUserInfo(accessToken: string) {
  try {
    const res = await fetch('https://boardq.o-r.kr/api/v1/profile/', {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
