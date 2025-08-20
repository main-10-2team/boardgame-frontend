'use client';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/utils/cn';
import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Toast } from '../common/Toast';

interface LikeButtonProps {
  liked: boolean;
  gameId: number;
  className?: string;
  lineColor?: string;
}

export default function LikeButton({
  liked = false,
  gameId,
  className,
  lineColor = 'text-white',
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const router = useRouter();
  const { toasts, success, error } = useToast();

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await fetch(`/api/likes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_id: gameId }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          success('로그인이 필요합니다.');
          router.push(`/auth/login`);
        } else {
          let message = '알 수 없는 오류가 발생했습니다.';
          if (typeof data?.action === 'string') {
            message = data.action;
          }
          success(message);
        }
        return;
      }

      // ✅ 서버 응답 기반으로 상태 세팅
      if (data.action === 'added') {
        setIsLiked(true);
        success('좋아요 되었습니다.');
      } else if (data.action === 'removed') {
        setIsLiked(false);
        success('좋아요가 취소되었습니다.');
      }
    } catch (error) {
      console.error(error);
      // 실패 시 상태 롤백 가능 (옵션)
    }
  };

  return (
    <>
      <Toast toasts={toasts} />
      <button
        onClick={handleLikeClick}
        className={cn('z-10 cursor-pointer p-2', className)}
      >
        {isLiked ? (
          <RiHeartFill className="text-primary-400 h-6 w-6" />
        ) : (
          <RiHeartLine className={`h-6 w-6 ${lineColor}`} />
        )}
      </button>
    </>
  );
}
