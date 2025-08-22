import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import {
  sendPasswordResetCode,
  verifyPasswordResetCode,
  changePassword,
} from '@/actions/auth';

export const usePasswordReset = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { toasts, success, error } = useToast();
  const { emailRules } = useEmailValidation();

  const sendCode = async (email: string, name: string) => {
    if (!name?.trim()) {
      error('이름을 입력해주세요');
      return false;
    }

    if (!emailRules.pattern.value.test(email)) {
      error(emailRules.pattern.message);
      return false;
    }

    setIsLoading(true);

    try {
      const result = await sendPasswordResetCode(email);

      if (result.success) {
        success(result.message || '인증번호가 전송되었습니다!');
        setIsCodeSent(true);
        setIsVerified(false);
        return true;
      } else {
        error(result.error || '인증번호 전송에 실패했습니다.');
        return false;
      }
    } catch (err) {
      error('인증번호 전송 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (email: string, verificationCode: string) => {
    if (!verificationCode?.trim()) {
      error('인증번호를 입력해주세요');
      return false;
    }

    setIsLoading(true);

    try {
      const result = await verifyPasswordResetCode(email, verificationCode);

      if (result.success) {
        if (result.reset_token) {
          setResetToken(result.reset_token);
        }
        success('인증번호가 확인되었습니다!');
        setIsVerified(true);
        return true;
      } else {
        error(result.error || '인증번호가 올바르지 않습니다.');
        return false;
      }
    } catch (err) {
      error('인증번호 확인 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changeUserPassword = async (newPassword: string) => {
    if (!resetToken) {
      error('인증이 완료되지 않았습니다. 인증번호를 먼저 확인해주세요.');
      return false;
    }

    setIsLoading(true);

    try {
      const result = await changePassword(resetToken, newPassword);

      if (result.success) {
        success('비밀번호가 변경되었습니다.');
        return true;
      } else {
        error(result.error || '비밀번호 변경에 실패했습니다.');
        return false;
      }
    } catch (err) {
      error('비밀번호 변경 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isCodeSent,
    isVerified,
    resetToken,
    isLoading,
    toasts,
    sendCode,
    verifyCode,
    changeUserPassword,
  };
};
