'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { TOAST_DURATION } from '@/constants/toast/toast';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  className?: string;
}

interface ToastWithId extends ToastProps {
  id: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);
  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const remove = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clear = useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
    setToasts([]);
  }, []);

  const add = useCallback(
    (type: ToastProps['type'], message: string, duration?: number) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

      setToasts((prev) => [...prev, { id, type, message }]);

      const finalDuration = duration ?? TOAST_DURATION.SHORT;
      if (finalDuration > 0) {
        const timer = setTimeout(() => remove(id), finalDuration);
        timers.current.set(id, timer);
      }
    },
    [remove]
  );

  useEffect(
    () => () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    },
    []
  );

  return {
    toasts,
    success: (message: string, duration?: number) =>
      add('success', message, duration),
    error: (message: string, duration?: number) =>
      add('error', message, duration),
    info: (message: string, duration?: number) =>
      add('info', message, duration),
    remove,
    clear,
  };
}

export type { ToastProps, ToastWithId };
