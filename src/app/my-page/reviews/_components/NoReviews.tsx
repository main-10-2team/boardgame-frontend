import Button from '@/components/common/Button';
import Link from 'next/link';

export default function NoReviews() {
  return (
    <div className="inner flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="mb-2 text-xl font-semibold text-gray-700">
        리뷰를 남긴 게임이 없습니다.
      </p>
      <p className="mb-10 text-gray-500">
        마음에 드는 보드게임을 찾아 <br />
        리뷰를 남겨보세요!
      </p>
      <Link href="/games">
        <Button size="lg">보드게임 둘러보기</Button>
      </Link>
    </div>
  );
}
