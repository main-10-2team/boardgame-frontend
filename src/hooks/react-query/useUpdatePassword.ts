import { updatePassword } from '@/api/user';
import { useMutation } from '@tanstack/react-query';

export function useUpdatePassword() {
  return useMutation({ mutationFn: updatePassword });
}
