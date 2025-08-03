export function useNicknameValidation() {
  const nicknameRules = {
    required: '닉네임을 입력해주세요',
    minLength: {
      value: 2,
      message: '닉네임은 2글자 이상 입력해주세요',
    },
    maxLength: {
      value: 20,
      message: '닉네임은 20글자 이하로 입력해주세요',
    },
  };

  return {
    nicknameRules,
  };
}
