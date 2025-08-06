import { cn } from '@/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  className?: string;
  color?: string;
  spinnerClassName?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-4',
  lg: 'w-10 h-10 border-[6px]',
};

export default function Spinner({
  size = 'md',
  centered = false,
  className = '',
  color = 'border-t-primary-400',
  spinnerClassName,
}: SpinnerProps) {
  return (
    <div
      className={cn(centered && 'flex items-center justify-center', className)}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-gray-300',
          sizeMap[size],
          color,
          spinnerClassName
        )}
      />
    </div>
  );
}
