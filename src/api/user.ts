'use server';

import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';

type WithdrawalPayload = {
  password: string;
  reason: string;
  additional_text?: string;
};

export async function deleteUser(payload: WithdrawalPayload) {
  const jar = await cookies();
  const access_token = jar.get('access_token')?.value;
  const formData = new FormData();

  formData.append('password', payload.password);
  formData.append('reason', payload.reason);

  if (payload.additional_text) {
    formData.append('additional_text', payload.additional_text);
  }

  return fetcher<{ message: string }>(
    '/profile/delete/',
    {
      method: 'POST',
      body: formData,
    },
    access_token
  );
}
