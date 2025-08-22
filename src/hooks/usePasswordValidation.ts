export function usePasswordValidation() {
  const passwordRules = {
    required: '비밀번호를 입력해주세요',
    minLength: {
      value: 8,
      message: '비밀번호는 8자리 이상 입력해주세요',
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: '영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다',
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
