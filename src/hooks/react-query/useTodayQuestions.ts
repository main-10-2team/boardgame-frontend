import { fetchTodayQuestion } from '@/api/board-pick';
import { Question } from '@/types/board-pick/boardPick';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// export function useTodayQuestions(step: number) {
//   return useQuery<Question>({
//     queryKey: ['todayQuestion', step],
//     queryFn: () => fetchTodayQuestion(step),
//   });
// }

export function useTodayQuestions(step?: number) {
  const enabled = typeof step === 'number' && step > 0;
  return useQuery<Question, Error>({
    queryKey: ['todayQuestion', step],
    queryFn: () => fetchTodayQuestion(step!),
    enabled,
    placeholderData: keepPreviousData,
    retry: (count, err) => {
      // 401/403은 재시도하지 않음
      const s = err.message.match(/\s(\d{3})\s/)?.[1];
      return !(s === '401' || s === '403') && count < 2;
    },
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });
}
