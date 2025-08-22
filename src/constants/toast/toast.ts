import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
} from '@remixicon/react';

export const TOAST_CONFIG = {
  success: {
    icon: RiCheckboxCircleFill,
    iconColor: '#53b483',
  },
  error: {
    icon: RiErrorWarningFill,
    iconColor: '#f7a1a1',
  },
  info: {
    icon: RiInformationFill,
    iconColor: '#3b82f6',
  },
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  DEFAULT: 3000,
  LONG: 5000,
  INFINITE: 0,
} as const;
