import { RiShareLine } from '@remixicon/react';

export default function ShareButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      //   toast.show({ message: 'URL이 복사되었습니다!', type: 'success' });
    } catch {
      //   toast.show({ message: 'URL 복사 실패', type: 'error' });
    }
  };

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 font-semibold text-gray-600 hover:text-gray-900"
      onClick={handleShare}
    >
      <RiShareLine className="h-6 w-6" />
      <p className="sr-only">공유하기</p>
    </button>
  );
}
