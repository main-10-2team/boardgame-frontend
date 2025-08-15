import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';

import Input from '@/components/common/Input';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { UnifiedSignUpFormData } from '@/types/auth/signup';

interface PhoneVerificationProps {
  register: UseFormRegister<UnifiedSignUpFormData>;
  errors: FieldErrors<UnifiedSignUpFormData>;
  phoneRules: RegisterOptions<UnifiedSignUpFormData, 'phone'>;
}

const PhoneVerification = ({
  register,
  errors,
  phoneRules,
}: PhoneVerificationProps) => {
  return (
    <Input
      {...register('phone', phoneRules)}
      type="tel"
      placeholder={PLACEHOLDERS.PHONE}
      inputSize={FORM_CONFIG.INPUT_SIZE}
      label="휴대폰 번호"
      error={errors.phone?.message}
      required
    />
  );
};

export default PhoneVerification;
