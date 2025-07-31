export const INPUT_SIZES = {
  sm: 'h-10 px-3',
  md: 'h-11 px-4',
  lg: 'h-12 px-5',
} as const;

export const INPUT_VARIANTS = {
  default: 'border-gray-300  bg-white text-gray-900 focus:border-pink-300',
  error: 'border-red-400 bg-white text-gray-900',
  success: 'border-green-600 bg-white text-gray-900',
  disabled: 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed',
} as const;
