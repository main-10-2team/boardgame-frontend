import { RiCheckLine } from '@remixicon/react';
import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  onToggle?: () => void;
  children?: React.ReactNode;
}

const Checkbox = ({
  onToggle,
  className,
  children,
  ...props
}: CheckboxProps) => {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2`}>
      <input
        type="checkbox"
        className="peer sr-only"
        onChange={onToggle}
        {...props}
      />
      <span
        className={
          'peer-checked:bg-primary-400 peer-checked:border-primary-400 flex h-5 w-5 items-center justify-center rounded border border-gray-400 transition-colors'
        }
      >
        <RiCheckLine className="text-white" />
      </span>
      {children}
    </label>
  );
};

export default Checkbox;
