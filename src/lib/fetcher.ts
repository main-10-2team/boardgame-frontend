const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiError extends Error {
  status: number;
  info: unknown;

  constructor(message: string, status: number, info: unknown) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
  accessToken?: string // SSR일 경우 직접 전달
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.method !== 'GET' && { 'Content-Type': 'application/json' }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorInfo = await res
      .json()
      .catch(() => ({ message: res.statusText }));
    throw new ApiError(
      errorInfo.message || res.statusText,
      res.status,
      errorInfo
    );
  }
  return res.json();
}
