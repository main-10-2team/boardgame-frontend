import { QueryParams } from '@/types/api';

export function buildQueryString(params: QueryParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'undefined') return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null) {
          searchParams.append(key, v);
        }
      });
    } else {
      searchParams.set(key, value);
    }
  });

  // 기본 페이지 번호 보장
  if (!searchParams.has('page')) {
    searchParams.set('page', '1');
  }

  return searchParams.toString();
}
