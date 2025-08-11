'use client';
import Button from '@/components/common/Button';

export default function DoneSection({
  onGoResult,
}: {
  onGoResult: () => void;
}) {
  return (
    <div className="inner mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl items-center justify-center px-6">
      <div className="w-full rounded-2xl bg-white/5 p-10 text-center text-white">
        <h2 className="mb-4 text-xl font-bold">분석 완료!</h2>
        <p className="mb-6 text-gray-300">결과 페이지로 이동합니다.</p>
        <Button variant="primary" onClick={onGoResult}>
          결과 보러가기
        </Button>
      </div>
    </div>
  );
}
