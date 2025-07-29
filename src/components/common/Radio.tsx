import { RiCheckLine } from '@remixicon/react';
import { InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  onToggle?: () => void;
  children?: React.ReactNode;
}

const Radio = ({ onToggle, children, ...props }: RadioProps) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        type="radio"
        className="peer sr-only"
        onChange={onToggle}
        {...props}
      />
      <span className="peer-checked:border-primary-400 flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 transition-all peer-checked:border-6">
        <RiCheckLine className="text-white" />
      </span>
      {children}
    </label>
  );
};

export default Radio;
