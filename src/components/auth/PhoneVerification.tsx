// src/components/auth/PhoneVerification.tsx

import React from 'react';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { FORM_CONFIG, PLACEHOLDERS } from '@/constants/form';
import { ExtendedSignUpFormData } from '@/types/auth/signup';

interface PhoneVerificationProps {
  register: UseFormRegister<ExtendedSignUpFormData>;
  errors: FieldErrors<ExtendedSignUpFormData>;
  phoneRules: RegisterOptions<ExtendedSignUpFormData, 'phone'>;
  isPhoneSent: boolean;
  isPhoneVerified: boolean;
  onSendCode: () => void;
  onConfirmCode: () => void;
}

const PhoneVerification = ({
  register,
  errors,
  phoneRules,
  isPhoneSent,
  isPhoneVerified,
  onSendCode,
  onConfirmCode,
}: PhoneVerificationProps) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        휴대폰 번호 <span className="text-primary-500">*</span>
      </label>
      <div className={`grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}>
        <Input
          {...register('phone', phoneRules)}
          type="tel"
          placeholder={PLACEHOLDERS.PHONE}
          inputSize={FORM_CONFIG.INPUT_SIZE}
          error={errors.phone?.message}
          success={isPhoneVerified ? '휴대폰 인증이 완료되었습니다' : false}
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

      {isPhoneSent && (
        <div
          className={`mt-3 grid w-full ${FORM_CONFIG.GRID_COLS} gap-x-2 gap-y-3`}
        >
          <Input
            {...register('phoneVerificationCode')}
            type="text"
            placeholder={PLACEHOLDERS.VERIFICATION_CODE}
            inputSize={FORM_CONFIG.INPUT_SIZE}
            success={isPhoneVerified ? '인증번호가 확인되었습니다' : false}
          />
          <div className="flex items-start">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-fit w-full font-semibold whitespace-nowrap"
              onClick={onConfirmCode}
              disabled={isPhoneVerified}
            >
              인증번호 확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;
