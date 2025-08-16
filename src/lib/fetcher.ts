const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
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
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      // FormData일 때는 Content-Type을 설정하지 않음 (브라우저가 자동으로 multipart/form-data 설정)
      ...(!isFormData &&
        options?.method !== 'GET' &&
        options?.body && { 'Content-Type': 'application/json' }),
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
