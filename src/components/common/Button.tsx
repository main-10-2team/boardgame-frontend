import { BUTTON_SIZES, BUTTON_VARIANTS } from '@/constants/button/button';
import type { MouseEvent, ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'md',
  ...others
}: ButtonProps) {
  const variantStyle = BUTTON_VARIANTS[variant];
  const sizeStyle = BUTTON_SIZES[size];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded py-2 px-4 cursor-pointer ${variantStyle} ${sizeStyle} ${className}`}
      {...others}
    >
      {children}
    </button>
  );
}
