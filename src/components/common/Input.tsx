import { INPUT_SIZES, INPUT_VARIANTS } from '@/constants/input/input';
import { cn } from '@/utils/cn';
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  success?: boolean | string;
  label?: string;
  variant?: keyof typeof INPUT_VARIANTS;
  inputSize?: keyof typeof INPUT_SIZES;
  containerClassName?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      disabled = false,
      className = '',
      error,
      success,
      label,
      variant = 'default',
      inputSize = 'md',
      containerClassName = '',
      required = false,
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

    const errorMessage = typeof error === 'string' ? error : '';
    const successMessage = typeof success === 'string' ? success : '';
    const message = errorMessage || successMessage;

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label className="mb-2 block text-base font-medium text-black">
            {label}
            {required && <span className="ml-0.5 text-pink-500">*</span>}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              'w-full rounded-lg border-2',
              'transition-colors duration-200 focus:outline-none',
              'text-base text-black placeholder:text-gray-400',
              INPUT_SIZES[inputSize],
              INPUT_VARIANTS[getVariant()],
              className
            )}
            {...props}
          />
        </div>

        {message && (
          <p
            className={cn(
              'mt-2 text-sm',
              errorMessage ? 'text-red-400' : 'text-green-600'
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
