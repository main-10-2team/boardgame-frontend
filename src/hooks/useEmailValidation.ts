export function useEmailValidation() {
  const emailRules = {
    required: '이메일을 입력해주세요',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '올바른 이메일 형식을 입력해주세요',
    },
  };

  return {
    emailRules,
  };
}
