import { TOAST_CONFIG } from '@/constants/toast/toast';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  className?: string;
}

interface ToastComponentProps {
  toast: ToastProps | null;
}

export function Toast({ toast }: ToastComponentProps) {
  if (!toast) return null;

  const config = TOAST_CONFIG[toast.type];
  const IconComponent = config.icon;

  return (
    <div
      className={`mb-4 flex items-center gap-3 p-4 rounded-lg border animate-fade-in ${config.bgColor} ${config.borderColor} ${toast.className || ''}`}
    >
      <IconComponent size={20} color={config.iconColor} />
      <span className={`flex-1 text-sm font-medium ${config.textColor}`}>
        {toast.message}
      </span>
    </div>
  );
}

export type { ToastProps };
