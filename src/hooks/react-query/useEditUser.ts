import { editUser } from '@/api/user';
import { useMutation } from '@tanstack/react-query';

export function useEditUser() {
  return useMutation({ mutationFn: editUser });
}
