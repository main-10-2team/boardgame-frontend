'use client';

import { useState } from 'react';

import Grid from '@/components/layout/Grid';
import { Toast } from '@/components/common/Toast';
import { usePasswordReset } from '@/hooks/usePasswordReset';

import FindPasswordForm from '@/components/auth/FindPasswordForm';
import PasswordChangeSection from '@/components/auth/PasswordChangeSection';

interface PasswordResetData {
  email: string;
  verificationCode: string;
  resetToken: string;
}

export default function FindPasswordPage() {
  const [step, setStep] = useState<'form' | 'change'>('form');
  const [passwordResetData, setPasswordResetData] = useState<PasswordResetData>(
    {
      email: '',
      verificationCode: '',
      resetToken: '',
    }
  );

  const {
    isCodeSent,
    isVerified,
    resetToken,
    isLoading,
    toasts,
    sendCode,
    verifyCode,
    changeUserPassword,
  } = usePasswordReset();

  const handleFormComplete = (data: PasswordResetData) => {
    setPasswordResetData(data);
    setStep('change');
  };

  return (
    <>
      <Toast toasts={toasts} />

      <div className="inner">
        <Grid className="pt-20 pb-30">
          <Grid.Item span="col-span-4 sm:col-start-3 sm:col-span-4 md:col-start-5 md:col-span-4">
            {step === 'change' ? (
              <PasswordChangeSection
                isLoading={isLoading}
                onChangePassword={changeUserPassword}
              />
            ) : (
              <FindPasswordForm
                isCodeSent={isCodeSent}
                isVerified={isVerified}
                isLoading={isLoading}
                resetToken={resetToken}
                onSendCode={sendCode}
                onVerifyCode={verifyCode}
                onComplete={handleFormComplete}
              />
            )}
          </Grid.Item>
        </Grid>
      </div>
    </>
  );
}
