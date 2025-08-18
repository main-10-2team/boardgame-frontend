import { fetchTodayQuestion } from '@/api/board-pick';
import { Question } from '@/types/board-pick/boardPick';
import { useQuery } from '@tanstack/react-query';

export function useTodayQuestions(step: number) {
  return useQuery<Question>({
    queryKey: ['todayQuestion', step],
    queryFn: () => fetchTodayQuestion(step),
  });
}
