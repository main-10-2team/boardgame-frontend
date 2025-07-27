import type { MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-4 py-2 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
