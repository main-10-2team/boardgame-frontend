'use client';

import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import Input from '@/components/common/Input';
import Modal from '@/components/common/modal/Modal';
import Grid from '@/components/layout/Grid';
import MyPageSideMenu from '@/components/myPage/SideMenu';
import { RiArrowRightSLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
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

const withdrawalReasons = [
  { label: '콘텐츠가 부족해요', value: 'lack_of_content' },
  { label: '사용이 불편해요', value: 'inconvenient_ui' },
  { label: '자주 사용하지 않아요', value: 'not_using' },
  { label: '다른 서비스로 이동', value: 'moved_to_other' },
  { label: '기타', value: 'other' },
];

export default function ProfilePage() {
  // 비밀번호 변경 모달
  // 모달 열림 상태 확인
  const [pwdModalOpen, setPwdModalOpen] = useState(false);
  // 상태값 정의
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 휴대폰 번호 변경 모달
  // 모달 열림 상태 확인
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  // 상태값 정의
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [confirmNum, setConfirmNum] = useState('');

  // 회원 탈퇴 모달
  // 모달 열림 상태 확인
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  // 상태값 정의
  const [selectedReason, setSelectedReason] = useState('');
  const closeWithdrawalModal = () => {
    setWithdrawalModal(false);
    setSelectedReason('');
  };
  // 회원 탈퇴 사유
  const withdrawalReasons = [
    { label: '콘텐츠가 부족해요', value: 'lack_of_content' },
    { label: '사용이 불편해요', value: 'inconvenient_ui' },
    { label: '자주 사용하지 않아요', value: 'not_using' },
    { label: '다른 서비스로 이동', value: 'moved_to_other' },
    { label: '기타', value: 'other' },
  ];

  // 비밀번호 변경 확인
  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    setPwdModalOpen(false);
  };

  // 휴대폰 번호 변경 확인
  const handlePhoneChange = () => {
    if (!name || !phoneNum || !confirmNum) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    console.log({
      name,
      phoneNum,
      confirmNum,
    });

    setPhoneModalOpen(false);
  };

  // 회원 탈퇴 확인
  const handleWithdraw = () => {
    if (!selectedReason) {
      alert('탈퇴 사유를 선택해주세요.');
      return;
    }

    console.log('탈퇴 요청', { selectedReason });

    // 실제 탈퇴 요청 API 호출 (예: await withdrawAccount(selectedReason))
    // 성공 시:
    closeWithdrawalModal();
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
            <div className="grid grid-cols-[1fr_3fr] items-center gap-y-6 text-sm whitespace-nowrap">
              <span className="self-start text-gray-600">이미지</span>
              <Image
                src={mockUser.profileImage || '/images/defaultProfileImg.png'}
                alt="기본 프로필 이미지"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />

              <span className="text-gray-600">닉네임</span>
              <span className="font-medium">{mockUser.nickname}</span>

              <span className="text-gray-600">이메일</span>
              <span className="font-medium">{mockUser.email}</span>
            </div>
            <div className="my-1 border border-gray-300"></div>
            {/* 기본 정보 영역 */}
            <h2 className="text-2xl font-semibold">기본 정보</h2>
            <div className="grid grid-cols-[1fr_3fr] items-center gap-x-2 gap-y-6 text-sm whitespace-nowrap">
              <span className="text-gray-600">이름</span>
              <span className="font-medium">{mockUser.name}</span>
              {/* 비밀번호 변경 모달 */}
              <span className="text-gray-600">비밀번호</span>
              <span>
                <Button
                  onClick={() => setPwdModalOpen(true)}
                  size="sm"
                  variant="secondary"
                  className="font-semibold"
                >
                  비밀번호 변경
                </Button>
                <Modal
                  modalId="passwordModal"
                  isOpen={pwdModalOpen}
                  onClose={() => setPwdModalOpen(false)}
                  className="w-[480px]"
                >
                  <div className="flex flex-col gap-6">
                    <div className="text-xl font-bold">비밀번호 변경</div>
                    <Input
                      type="text"
                      label="이름"
                      inputSize="md"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      label="휴대폰 번호"
                      value={newPassword}
                      inputSize="md"
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      label="새 비밀번호 확인"
                      value={confirmPassword}
                      inputSize="md"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={
                        confirmPassword && confirmPassword !== newPassword
                          ? '비밀번호가 일치하지 않습니다.'
                          : false
                      }
                      success={
                        confirmPassword && confirmPassword === newPassword
                          ? '비밀번호가 일치합니다.'
                          : false
                      }
                      required
                    />
                    <Button onClick={handlePasswordChange} className="w-full">
                      확인
                    </Button>
                  </div>
                </Modal>
              </span>

              {/* 휴대폰번호 변경 모달 */}
              <span className="text-gray-600">휴대폰 번호</span>
              <span className="flex items-center">
                010-1234-5678
                <Button
                  onClick={() => setPhoneModalOpen(true)}
                  size="sm"
                  variant="secondary"
                  className="ml-3 w-fit font-semibold"
                >
                  변경
                </Button>
                <Modal
                  modalId="phoneModal"
                  isOpen={phoneModalOpen}
                  onClose={() => setPhoneModalOpen(false)}
                  className="w-[480px]"
                >
                  <div className="flex flex-col gap-6">
                    <div className="text-xl font-bold">휴대폰 번호 변경</div>
                    <Input
                      label="이름 입력"
                      inputSize="md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black">
                        휴대폰 번호
                        <span className="ml-0.5 text-pink-500">*</span>
                      </label>
                      <div className="mb-3 grid w-full grid-cols-[2fr_1fr] gap-x-2 gap-y-3">
                        <Input
                          type="number"
                          placeholder="휴대폰번호 입력"
                          value={phoneNum}
                          inputSize="md"
                          onChange={(e) => setPhoneNum(e.target.value)}
                          required
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full font-semibold whitespace-nowrap"
                        >
                          인증번호 전송
                        </Button>
                        <Input
                          type="password"
                          placeholder="인증번호 입력"
                          value={confirmNum}
                          inputSize="md"
                          onChange={(e) => setConfirmNum(e.target.value)}
                          required
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full font-semibold whitespace-nowrap"
                        >
                          인증 확인
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handlePhoneChange} className="w-full">
                      확인
                    </Button>
                  </div>
                </Modal>
              </span>

              <span className="text-gray-600">성별</span>
              <span>남자</span>

              <span className="text-gray-600">생년월일</span>
              <span>2000.00.00</span>
            </div>
          </section>
          {/* 회원 탈퇴 */}
          <div className="mt-5 flex justify-end">
            <Button
              onClick={() => setWithdrawalModal(true)}
              variant="transparent"
              className="flex text-gray-600"
            >
              회원 탈퇴
              <RiArrowRightSLine />
            </Button>
            <Modal
              modalId="deleteMemberModal"
              isOpen={withdrawalModal}
              onClose={() => setWithdrawalModal(false)}
              className="w-[480px]"
            >
              <div className="flex flex-col gap-8">
                <div className="text-xl font-semibold">회원 탈퇴</div>
                <div>
                  <p className="mb-3 text-base leading-relaxed font-medium text-gray-600">
                    <span className="text-gray-900">{mockUser.name}</span>님,
                    그동안 함께해 주셔서 감사드립니다.
                  </p>
                  <p className="text-sm font-normal text-gray-600">
                    더 나은 서비스를 위해 탈퇴하시려는 이유를 들려주실 수
                    있을까요?
                    <br />
                    잠깐만 시간을 내어 사유를 알려주시면 참고하여 개선에
                    반영하겠습니다.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black">
                    탈퇴 사유
                  </label>
                  <Dropdown
                    options={withdrawalReasons}
                    selectedValue={selectedReason}
                    onChange={setSelectedReason}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  * 탈퇴 시 회원님의 모든 콘텐츠와 기록이 삭제됩니다.
                </p>
                <Button onClick={handleWithdraw} className="w-full">
                  확인
                </Button>
              </div>
            </Modal>
          </div>
        </Grid.Item>
      </Grid>
    </main>
  );
}
