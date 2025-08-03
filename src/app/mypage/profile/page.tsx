'use client';

import { userProfile } from '@/assets/mocks/userProfile';
import Button from '@/components/common/Button';
import Grid from '@/components/layout/Grid';
import ProfileDetail from '@/components/myPage/profile/ProfileDetail';
import ProfileInfoSection from '@/components/myPage/profile/ProfileInfoSection';
import WithdrawalButton from '@/components/myPage/profile/WithdrawalButton';
import MyPageSideMenu from '@/components/myPage/SideMenu';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
  // 회원 탈퇴 모달
  const [withdrawalModal, setWithdrawalModal] = useState(false);

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
          <h1 className="mb-6 text-3xl font-semibold">내 정보</h1>
          <section className="flex flex-col gap-8 rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">프로필</h2>
              <Link href="/mypage/profile/edit">
                <Button size="sm" variant="secondary" className="font-semibold">
                  프로필 수정
                </Button>
              </Link>
            </div>

            {/* 프로필 영역 */}
            <ProfileDetail user={userProfile} />

            <div className="my-1 border border-gray-300"></div>
            {/* 기본 정보 영역 */}
            <ProfileInfoSection user={userProfile} />
          </section>

          {/* 회원 탈퇴 */}
          <WithdrawalButton userName={userProfile.name} />
        </Grid.Item>
      </Grid>
    </main>
  );
}
