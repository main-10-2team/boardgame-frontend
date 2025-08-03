export function usePasswordValidation() {
  const passwordRules = {
    required: '비밀번호를 입력해주세요',
    minLength: {
      value: 8,
      message: '비밀번호는 8자리 이상 입력해주세요',
    },
  };

  const confirmPasswordRules = (password: string) => ({
    required: '비밀번호 확인을 입력해주세요',
    validate: (value: string) =>
      value === password || '비밀번호가 일치하지 않습니다',
  });

  return {
    passwordRules,
    confirmPasswordRules,
  };
}
