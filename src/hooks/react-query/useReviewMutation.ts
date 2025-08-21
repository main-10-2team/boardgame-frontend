// hooks/useReviewMutation.ts
import { createReview, updateReview } from '@/lib/api/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useReviewMutation(
  gameId: number,
  onClose: () => void,
  onSave: () => void
) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (payload: { content: string; rating: number }) =>
      createReview(gameId, payload.content, payload.rating),
    onSuccess: async () => {
      queryClient.invalidateQueries(['game', gameId]);
      await queryClient.invalidateQueries({ queryKey: ['reviews', gameId] });
      await queryClient.refetchQueries({ queryKey: ['reviews', gameId] });
      onSave();
      onClose();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const update = useMutation({
    mutationFn: (payload: {
      reviewId: number;
      content: string;
      rating: number;
    }) => updateReview(payload.reviewId, payload.content, payload.rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameDetail', gameId] });
      queryClient.invalidateQueries({ queryKey: ['reviews', gameId] });
      onSave();
      onClose();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return { create, update };
}
