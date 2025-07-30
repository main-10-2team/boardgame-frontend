import { create } from 'zustand';

// 모달 상태 타입 정의
interface ModalState {
  openModals: string[];
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  getTopModal: () => string | null;
}

// zustand 스토어 생성
export const useModalStore = create<ModalState>((set, get) => ({
  openModals: [],
  // 모달 열기
  openModal: (id) =>
    set((state) => ({
      // 모달이 이미 열려있다면 중복 제거 후 맨 뒤로 추가
      openModals: [...state.openModals.filter((mid) => mid !== id), id],
    })),
  // 모달 닫기
  closeModal: (id) =>
    set((state) => ({
      // 해당 id를 가진 모달만 제거
      openModals: state.openModals.filter((mid) => mid !== id),
    })),
  // 최상단 모달 가져오기
  getTopModal: () => {
    const { openModals } = get();
    return openModals[openModals.length - 1] || null;
  },
}));
