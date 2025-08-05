export const FORM_CONFIG = {
  GRID_SPAN:
    'col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4',
  INPUT_SIZE: 'md' as const,
  ERROR_HEIGHT: 'h-[20px]',
  GRID_COLS: 'grid-cols-[2fr_1fr]',
} as const;

export const PLACEHOLDERS = {
  NAME: '이름을 입력해주세요.',
  EMAIL: '이메일',
  NICKNAME: '2~20자 한글 또는 영문',
  PHONE: '01012345678 (11자리)',
  BIRTH: '생년월일을 입력해주세요',
  PASSWORD: '영문 대소문자, 숫자, 특수문자 포함 8자 이상',
  CONFIRM_PASSWORD: '비밀번호를 다시 입력해주세요.',
  VERIFICATION_CODE: '인증번호 입력',
} as const;
