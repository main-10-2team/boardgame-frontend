'use client';

import { useState } from 'react';
import { TOAST_DURATION } from '@/constants/toast/toast';
import type { ToastProps } from '@/components/common/Toast';

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (
    type: ToastProps['type'],
    message: string,
    duration?: number
  ) => {
    setToast({ type, message });

    const finalDuration = duration ?? TOAST_DURATION.DEFAULT;
    if (finalDuration > 0) {
      setTimeout(() => setToast(null), finalDuration);
    }
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    toast,
    showToast,
    hideToast,
    success: (message: string, duration?: number) =>
      showToast('success', message, duration),
    error: (message: string, duration?: number) =>
      showToast('error', message, duration),
    info: (message: string, duration?: number) =>
      showToast('info', message, duration),
  };
}
