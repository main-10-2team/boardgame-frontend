import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
} from '@remixicon/react';

export const TOAST_CONFIG = {
  success: {
    icon: RiCheckboxCircleFill,
    iconColor: '#53b483',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
    textColor: 'text-gray-800',
  },
  error: {
    icon: RiErrorWarningFill,
    iconColor: '#f7a1a1',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
    textColor: 'text-gray-800',
  },
  info: {
    icon: RiInformationFill,
    iconColor: '#3b82f6',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
    textColor: 'text-gray-800',
  },
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  DEFAULT: 3000,
  LONG: 5000,
  INFINITE: 0,
} as const;
