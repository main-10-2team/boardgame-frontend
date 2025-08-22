'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  targetId?: string; // 렌더링할 DOM 노드 아이디
}

// Portal로 감싼 내용을 다른 DOM 위치에 렌더링해주는 컴포넌트
export default function Portal({ children, targetId = 'modal' }: PortalProps) {
  const [mounted, setMounted] = useState(false); // 클라이언트 마운트 여부

  // 컴포넌트가 마운트된 후에만 Portal을 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 사이드 렌더링 시 포탈을 렌더링하지 않음
  if (!mounted) return null;

  // targetId를 가진 자식 요소를 포탈로 렌더링
  const el = document.getElementById(targetId);
  return el ? createPortal(children, el) : null;
}
