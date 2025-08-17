// components/Accordion.tsx
'use client';

import { RiArrowDownSLine } from '@remixicon/react';
import { useState } from 'react';

/**
 * 재사용 가능한 아코디언 컴포넌트
 * @param {string} title - 아코디언의 제목
 * @param {React.ReactNode} children - 아코디언 안에 들어갈 내용
 */

interface AccordionProps {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}

export default function Accordion({
  title,
  open = true,
  children,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(open);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={toggleAccordion}
      >
        <h3 className="font-medium select-none">{title}</h3>
        <span
          className={`transform text-gray-500 transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <RiArrowDownSLine />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'mt-2 max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-h-80 overflow-x-hidden overflow-y-auto border-t border-gray-200 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
