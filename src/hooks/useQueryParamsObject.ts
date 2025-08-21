'use client';

import { useSearchParams } from 'next/navigation';

export function useQueryParamsObject() {
  const searchParams = useSearchParams();
  const queryObj = {} as Record<string, string | string[]>;

  searchParams.forEach((value, key) => {
    if (queryObj[key]) {
      queryObj[key] = Array.isArray(queryObj[key])
        ? [...queryObj[key], value]
        : [queryObj[key] as string, value];
    } else {
      queryObj[key] = value;
    }
  });

  return queryObj;
}
