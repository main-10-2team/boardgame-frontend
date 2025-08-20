'use client';

import { useToast } from '@/hooks/useToast';
import { toggleLikeApi } from '@/lib/api/like';
import { ApiError } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useToggleLike(gameId: number) {
  const router = useRouter();
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeApi(gameId),
    onSuccess: (data) => {
      if (data.action === 'added') {
        success('좋아요 되었습니다.');
      } else {
        success('좋아요가 취소되었습니다.');
      }
      // ✅ 게임 리스트/상세 invalidate → UI 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['games'] });
      queryClient.invalidateQueries({ queryKey: ['game', gameId] });
    },
    onError: (err: ApiError) => {
      if (err.status === 401) {
        success('로그인이 필요합니다.');
        router.push('/auth/login');
      } else {
        error(err.message ?? '알 수 없는 오류가 발생했습니다.');
      }
    },
  });
}
