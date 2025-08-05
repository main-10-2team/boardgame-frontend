import Button from '@/components/common/Button';
import Link from 'next/link';

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4 text-sm font-semibold">
      <Button variant="transparent">
        <Link href="/auth/login">로그인</Link>
      </Button>
      <Button className="bg-gray-400 text-white">
        <Link href="/auth/signup">회원가입</Link>
      </Button>
    </div>
  );
}
