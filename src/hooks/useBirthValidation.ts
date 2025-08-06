export function useBirthValidation() {
  const birthRules = {
    required: '생년월일을 입력해주세요',
    pattern: {
      value: /^\d{8}$/,
      message: '생년월일 8자리를 입력해주세요 (예: 19920930)',
    },
  };

  // 8자리 숫자를 YYYY-MM-DD 형식으로 변환
  const formatBirthForSave = (birth: string) => {
    if (!birth || birth.length !== 8) return birth;

    const year = birth.substring(0, 4);
    const month = birth.substring(4, 6);
    const day = birth.substring(6, 8);

    return `${year}-${month}-${day}`;
  };

  return {
    birthRules,
    formatBirthForSave,
  };
}
