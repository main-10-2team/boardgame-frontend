'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Grid from '@/components/layout/Grid';
import MyPageSideMenu from '@/components/myPage/SideMenu';
import { RiCamera2Fill } from '@remixicon/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const mockUser = {
  name: '김유저',
  nickname: '닉유네저임',
  email: 'user@example.com',
  profileImage: '',
  reviewCount: 13,
  likeCount: 24,
  joinDate: '2025-07-22T00:00:00Z',
  preferredGenres: [
    '전략',
    '카드',
    '추리',
    '파티',
    '거래',
    '배틀',
    '영역확장',
    '블러핑',
    '스토리텔링',
  ],
  preferredPlaytimes: ['30분 미만', '1시간 이상'],
  popularGenres: ['전략', '블러핑', '추리'],
  // 이건 백엔드에서 해줘야할듯
  percentile: 73,
  // percentile을 토대로 프론트에서 가공 필요
  tier: '보드게임 비기너!',
};

export default function ProfileEditPage() {
  const [nickname, setNickname] = useState(mockUser.nickname);
  const [email, setEmail] = useState(mockUser.email);
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
    // 유효성 검사 여기에 추가하기
    console.log({ nickname, email });
    // 성공적으로 저장했다면 이동
    router.push('/mypage/profile');
  };

  return (
    <main className="flex flex-1 flex-col">
      <Grid className="mx-auto max-w-[1140px] py-10 lg:px-6 xl:px-0">
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
                      : mockUser.profileImage?.trim()
                        ? mockUser.profileImage
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
