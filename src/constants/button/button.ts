// 색깔
export const BUTTON_VARIANTS = {
  primary: 'bg-primary-500 text-white shadow-md',
  secondary: 'border border-gray-200 text-black bg-white shadow-md',
  transparent: 'bg-transparent text-black',
} as const;

// 크기
export const BUTTON_SIZES = {
  sm: 'text-sm px-4.5 py-2.5',
  md: 'text-base px-5 py-3',
  lg: 'text-lg px-5.5 py-3.5',
  xl: 'text-lg px-6 py-4',
  xxl: 'text-xl px-6 py-4',
} as const;
