import Button from '@/components/common/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="inner flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="text-primary-400 mb-4 text-9xl font-bold">404</h1>
      <p className="mb-2 text-xl font-semibold text-gray-600">
        페이지를 찾을 수 없습니다.
      </p>
      <p className="mb-20 text-gray-500">
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
      </p>
      <Link href="/">
        <Button size="lg">홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
