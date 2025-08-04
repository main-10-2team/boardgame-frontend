import Button from '@/components/common/Button';
import Modal from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  modalId: string;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  modalId,
  title,
  message,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal
      modalId={modalId}
      isOpen={isOpen}
      onClose={onClose}
      hasCloseButton={false}
      className="w-[280px] px-6 py-4 pt-8"
    >
      <div className="mb-4 text-center text-xl font-bold">{title}</div>
      <p className="mb-6 text-center text-xs">{message}?</p>
      <div className="flex justify-between border-t border-gray-200 pt-4">
        <Button onClick={onClose} variant="transparent">
          아니요
        </Button>
        <Button onClick={onConfirm} variant="transparent">
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
