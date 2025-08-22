export function usePhoneValidation() {
  const phoneRules = {
    required: '휴대폰 번호를 입력해주세요',
    pattern: {
      value: /^010[0-9]{8}$/,
      message: '010으로 시작하는 11자리 숫자를 입력해주세요',
    },
  };

  const convertToInternational = (phone: string) => {
    const cleaned = phone.replace(/[^0-9]/g, '');

    if (cleaned.startsWith('010') && cleaned.length === 11) {
      return `+82${cleaned.substring(1)}`;
    }

    return phone;
  };

  return {
    phoneRules,
    convertToInternational,
  };
}
