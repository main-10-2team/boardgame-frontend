// src/components/auth/EmailVerification.tsx

import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { UnifiedSignUpFormData } from '@/types/auth/signup';

interface EmailVerificationProps {
  register: UseFormRegister<UnifiedSignUpFormData>;
  errors: FieldErrors<UnifiedSignUpFormData>;
  emailRules: RegisterOptions<UnifiedSignUpFormData, 'email'>;
  isEmailSent: boolean;
  isEmailVerified: boolean;
  onSendCode: () => void;
  onConfirmCode: () => void;
}

const EmailVerification = ({
  register,
  errors,
  emailRules,
  isEmailSent,
  isEmailVerified,
  onSendCode,
  onConfirmCode,
}: EmailVerificationProps) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        이메일 <span className="text-primary-500">*</span>
      </label>

      <div className={`grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}>
        <Input
          {...register('email', emailRules)}
          type="email"
          placeholder={PLACEHOLDERS.EMAIL}
          inputSize={FORM_CONFIG.INPUT_SIZE}
          error={errors.email?.message}
          success={isEmailVerified ? '이메일 인증이 완료되었습니다' : false}
          required
        />
        <div className="flex items-start">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-fit w-full font-semibold whitespace-nowrap"
            onClick={onSendCode}
          >
            인증번호 전송
          </Button>
        </div>
      </div>

      {isEmailSent && (
        <div
          className={`mt-3 grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}
        >
          <Input
            {...register('emailVerificationCode')}
            type="text"
            placeholder={PLACEHOLDERS.VERIFICATION_CODE}
            inputSize={FORM_CONFIG.INPUT_SIZE}
            success={isEmailVerified ? '인증번호가 확인되었습니다' : false}
          />
          <div className="flex items-start">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-fit w-full font-semibold whitespace-nowrap"
              onClick={onConfirmCode}
              disabled={isEmailVerified}
            >
              인증번호 확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
