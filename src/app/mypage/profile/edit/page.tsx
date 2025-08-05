'use client';

import { userProfile } from '@/assets/mocks/userProfile';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import MyPageSideMenu from '@/components/myPage/SideMenu';
import { RiCamera2Fill } from '@remixicon/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfileEditPage() {
  const [nickname, setNickname] = useState(userProfile.nickname);
  const [email, setEmail] = useState(userProfile.email);
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // base64 프리뷰
      };
      reader.readAsDataURL(file);
      // TODO: 서버에 업로드할 file 객체도 저장 가능
    }
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    // // 유효성 검사 여기에 추가하기
    // console.log({ nickname, email });
    // 성공적으로 저장했다면 이동
    router.push('/mypage/profile');
  };

  return (
    <main className="inner flex flex-1 flex-col py-10">
      <Grid>
        {/* 사이드바 */}
        <Grid.Item span="col-span-12 md:col-span-3">
          <MyPageSideMenu />
        </Grid.Item>

        {/* 메인 콘텐츠 */}
        <Grid.Item span="col-span-12 md:col-span-9 md:pt-18">
          {/* 프로필 */}
          <h1 className="mb-6 text-3xl font-semibold">내 정보 수정</h1>
          <form onSubmit={handleSubmit}>
            <section className="flex flex-col gap-8 rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold">프로필</h2>
              {/* 프로필 이미지 */}
              <label className="relative size-[100px] cursor-pointer">
                <Image
                  src={
                    image?.trim()
                      ? image
                      : userProfile.profile_image?.trim()
                        ? userProfile.profile_image
                        : '/images/defaultProfileImg.png'
                  }
                  alt="프로필 이미지"
                  fill
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
                <button
                  type="button"
                  className="bg-primary-400 absolute right-0 bottom-0 rounded-full p-2"
                >
                  <RiCamera2Fill size={16} color="#fff" />
                </button>
              </label>
              <Input
                label="닉네임"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                inputSize="md"
              />
              <Input
                label="이메일"
                value={email}
                inputSize="md"
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>
            <div className="mt-5 flex justify-end">
              <Button type="submit" className="flex text-gray-600">
                저장하기
              </Button>
            </div>
          </form>
        </Grid.Item>
      </Grid>
    </main>
  );
}
