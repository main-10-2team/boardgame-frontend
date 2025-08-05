import { TOAST_CONFIG } from '@/constants/toast/toast';
import type { ToastWithId } from '@/hooks/useToast';
interface ToastContainerProps {
  toasts: ToastWithId[];
  onRemove?: (id: string) => void;
}

export function Toast({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: ToastWithId;
  onRemove?: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const config = TOAST_CONFIG[toast.type];
  const IconComponent = config.icon;

  return (
    <div
      className={`animate-fade-in flex w-auto max-w-md min-w-[300px] items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${toast.className || ''} `}
    >
      <IconComponent size={20} color={config.iconColor} />
      <span className="flex-1 text-sm font-medium text-gray-800">
        {toast.message}
      </span>
      {onRemove && (
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-2 text-gray-400 transition-colors hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
