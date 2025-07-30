'use client';

import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { cn } from '@/utils/cn'; // className join 유틸 (선택)
import { RiArrowDownSLine } from '@remixicon/react';
import { useRef, useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function Dropdown({
  options,
  selectedValue,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label ?? '';

  // 외부 클릭 시 닫기
  useOutsideClick(dropdownRef, () => setIsOpen(false));
  useEscapeKey(() => setIsOpen(false));

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        id="dropdown-button"
        className="flex items-center gap-1 text-base font-medium text-black"
      >
        {selectedLabel}
        <RiArrowDownSLine className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-40 overflow-hidden rounded-2xl bg-white px-4 py-6 shadow-lg ring-1 ring-black/5">
          <ul
            role="listbox"
            aria-labelledby="dropdown-button"
            className="space-y-2"
          >
            {options.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'relative flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm hover:bg-gray-50',
                    isSelected &&
                      'before:bg-primary-400 bg-gray-100 font-semibold before:absolute before:top-0 before:-left-4 before:h-full before:w-2 before:rounded-lg before:content-[""]'
                  )}
                >
                  <span>{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
