import Portal from '@/components/common/modal/Portal';
import { Z_INDEX } from '@/constants/zIndex';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import useScrollLock from '@/hooks/useScrollLock';
import { useModalStore } from '@/store/modalStore';
import { cn } from '@/utils/cn';
import { RiCloseLine } from '@remixicon/react';
import { useEffect } from 'react';

interface ModalProps {
  modalId: string; // 모달 고유 id
  isOpen: boolean; // 모달 열림 상태 제어
  onClose: () => void; // 닫기 함수 전달
  children: React.ReactNode;
  className?: string;
  hasCloseButton?: boolean; // 닫기 버튼 표시 여부
  isBackgroundOverlay?: boolean; // 배경 오버레이 여부
  zIndexBase?: number; // z-index 기준값
}

const Modal = ({
  modalId,
  isOpen,
  onClose,
  children,
  className,
  hasCloseButton = true,
  isBackgroundOverlay = true,
  zIndexBase = Z_INDEX.MODAL,
}: ModalProps) => {
  const { openModal, closeModal, openModals, getTopModal } = useModalStore();

  // 모달 닫기 함수
  const handleClose = () => {
    onClose();
    closeModal(modalId);
  };

  // 현재 모달이 최상단 모달인지 판단
  const topModalId = getTopModal();
  const isTopModal = topModalId === modalId;

  // esc 키로 모달 닫기
  useEscapeKey(() => {
    if (isOpen && isTopModal) {
      onClose();
      closeModal(modalId);
    }
  });

  // 스크롤 막기
  useScrollLock(isOpen && isTopModal);

  // 모달 열림 상태 관리
  useEffect(() => {
    if (isOpen) openModal(modalId);
    else closeModal(modalId);

    // 클린업시 모달닫기
    return () => closeModal(modalId);
  }, [isOpen, modalId, openModal, closeModal]);

  // 현재 열린 모달이 없으면 렌더링 x
  if (!openModals.includes(modalId)) return null;

  // z-index 계산 (열린 순서 기준)
  const currentZIndex = zIndexBase + openModals.indexOf(modalId) * 10;

  return (
    <Portal targetId="modal">
      <div
        id={modalId}
        className={cn(
          'fixed inset-0 flex items-center justify-center',
          isBackgroundOverlay && 'bg-black/30'
        )}
        style={{ zIndex: currentZIndex }}
        onClick={isTopModal ? handleClose : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${modalId}`}
      >
        <div
          className={cn(
            'relative rounded-md bg-white px-6 py-8 shadow-lg transition-all',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {hasCloseButton && (
            <button
              onClick={handleClose}
              className="absolute top-8 right-6 cursor-pointer"
              aria-label="모달 닫기"
            >
              <RiCloseLine />
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
};
export default Modal;
