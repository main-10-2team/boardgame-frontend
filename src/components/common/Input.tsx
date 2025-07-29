import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { INPUT_SIZES, INPUT_VARIANTS } from '@/constants/input/input';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  success?: boolean;
  successMessage?: string;
  label?: string;
  helperText?: string;
  variant?: keyof typeof INPUT_VARIANTS;
  size?: keyof typeof INPUT_SIZES;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      disabled = false,
      className = '',
      error,
      success,
      successMessage,
      label,
      helperText,
      variant = 'default',
      size = 'md',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const getVariant = (): keyof typeof INPUT_VARIANTS => {
      if (disabled) return 'disabled';
      if (error) return 'error';
      if (success) return 'success';
      return variant;
    };

    const hasMessage = error || (success && successMessage) || helperText;
    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label className="block text-sm font-medium text-black mb-2">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              'w-full border-2 rounded-lg',
              'transition-colors duration-200 focus:outline-none',
              'font-pretendard text-base placeholder:text-gray-400',
              INPUT_SIZES[size],
              INPUT_VARIANTS[getVariant()],
              className
            )}
            {...props}
          />
        </div>

        {hasMessage && (
          <div className="mt-3 transition-all duration-200">
            {error && <p className="text-sm text-red-600">{error}</p>}

            {success && successMessage && !error && (
              <p className="text-sm text-green-600">{successMessage}</p>
            )}

            {helperText && !error && !successMessage && (
              <p className="text-sm text-black">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
