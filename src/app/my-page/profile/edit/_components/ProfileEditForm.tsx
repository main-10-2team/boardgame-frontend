'use client';

import { convertToLocalPhone } from '@/app/my-page/profile/_components/ProfileDetail';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ProfileImage } from '@/components/common/ProfileImage';
import { useEditUser } from '@/hooks/react-query/useEditUser';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { RiCamera2Fill } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProfileEditFormProps {
  userProfile: {
    nickname: string;
    phone_number: string;
    profile_image: string | null;
  };
}

interface FormValues {
  nickname: string;
  phone_number: string;
}

export default function ProfileEditForm({ userProfile }: ProfileEditFormProps) {
  const router = useRouter();
  // 이미지 미리보기 렌더링 용
  const [image, setImage] = useState<string | null>(null);
  // 서버 전송용
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { phoneRules, convertToInternational } = usePhoneValidation();
  const { nicknameRules } = useNicknameValidation();

  // 하이픈 제거 함수
  const removeHyphens = (phone: string) => phone.replace(/-/g, '');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nickname: userProfile.nickname,
      phone_number: removeHyphens(
        convertToLocalPhone(userProfile.phone_number)
      ),
    },
  });
  const { mutate } = useEditUser();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setImage(result);
        }
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    const internationalPhone = convertToInternational(data.phone_number);
    mutate(
      {
        nickname: data.nickname,
        phone_number: internationalPhone,
        profile_image: imageFile || null,
      },
      {
        onSuccess: () => {
          alert('수정이 완료되었습니다.');
          router.refresh();
          router.push('/my-page/profile');
        },
        onError: (err) => {
          console.error('프로필 수정 실패:', err);
          alert('수정에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">내 정보 수정</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-8 rounded-xl border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold">프로필</h2>
          {/* 프로필 이미지 */}
          <label
            htmlFor="profile-upload"
            className="relative size-[100px] cursor-pointer"
          >
            <ProfileImage
              src={image || userProfile.profile_image}
              alt="프로필 이미지"
              fill
              sizes="100px"
              unoptimized
              priority
              className="rounded-full object-cover"
            />

            <Input
              type="file"
              accept="image/*"
              id="profile-upload"
              className="sr-only" // 시각적으로 숨김
              onChange={handleImageChange}
            />
            <div className="bg-primary-400 absolute right-0 bottom-0 cursor-pointer rounded-full p-2">
              <RiCamera2Fill size={16} color="#fff" />
            </div>
          </label>
          <Input
            label="닉네임"
            placeholder="닉네임을 입력하세요"
            inputSize="md"
            error={errors.nickname?.message}
            required
            {...register('nickname', nicknameRules)}
          />
          <Input
            type="tel"
            placeholder="01012345678 (11자리)"
            inputSize="md"
            label="휴대폰 번호"
            error={errors.phone_number?.message}
            required
            {...register('phone_number', phoneRules)}
          />
        </section>
        <div className="mt-5 flex justify-end">
          <Button type="submit" className="flex text-gray-600">
            저장하기
          </Button>
        </div>
      </form>
    </>
  );
}
