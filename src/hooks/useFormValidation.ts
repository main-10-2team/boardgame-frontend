import { useEmailValidation } from '@/hooks/useEmailValidation';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';
import { useBirthValidation } from '@/hooks/useBirthValidation';

export const useFormValidation = () => {
  const { emailRules } = useEmailValidation();
  const { phoneRules, convertToInternational } = usePhoneValidation();
  const { passwordRules, confirmPasswordRules } = usePasswordValidation();
  const { nicknameRules } = useNicknameValidation();
  const { birthRules, formatBirthForSave } = useBirthValidation();

  return {
    emailRules,
    phoneRules,
    passwordRules,
    confirmPasswordRules,
    nicknameRules,
    birthRules,

    convertToInternational,
    formatBirthForSave,
  };
};
