'use server';

import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';

// 회원 탈퇴
interface WithdrawalPayload {
  password: string;
  reason: string;
  additional_text?: string;
}

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

// 프로필 변경
interface EditProfilePayload {
  nickname: string;
  phone_number: string;
  profile_image?: File | string | null;
}

export async function editUser(payload: EditProfilePayload) {
  const jar = await cookies();
  const token = jar.get('access_token')?.value;

  const formData = new FormData();
  formData.append('nickname', payload.nickname);
  formData.append('phone_number', payload.phone_number);

  if (payload.profile_image instanceof File) {
    formData.append('profile_image', payload.profile_image);
  }

  return fetcher(
    '/profile/update/',
    { method: 'PATCH', body: formData },
    token
  );
}

// 비밀번호 변경
interface UpdatePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

export async function updatePassword(data: UpdatePasswordPayload) {
  const jar = await cookies();
  const token = jar.get('access_token')?.value;
  return fetcher<{ message: string }>(
    '/profile/password/',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
    token
  );
}
