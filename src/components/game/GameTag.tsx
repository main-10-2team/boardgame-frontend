import { cn } from '@/utils/cn';
interface GameTagProps {
  tagLabel: string;
  isOverlay: boolean;
  size?: 'sm' | 'md' | 'lg';
}
export function GameTag({ tagLabel, isOverlay, size = 'sm' }: GameTagProps) {
  return (
    <span
      className={cn(
        'rounded-full font-medium',
        size === 'sm' && 'text-2.5 px-2 py-1',
        size === 'md' && 'text-md px-3 py-1.5',
        size === 'lg' && 'px-4 py-2 text-base',
        isOverlay
          ? 'bg-primary-500 text-white'
          : 'bg-primary-50 text-primary-500'
      )}
    >
      #{tagLabel}
    </span>
  );
}
