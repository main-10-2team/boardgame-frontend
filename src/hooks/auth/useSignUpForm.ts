import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';
import { useBirthValidation } from '@/hooks/useBirthValidation';
import { UnifiedSignUpFormData } from '@/types/auth/signup';
import { sendEmailCode, verifyEmailCode, signUp } from '@/actions/auth';

export const useSignUpForm = () => {
  const { toasts, success, error } = useToast();

  const { emailRules } = useEmailValidation();
  const { phoneRules, convertToInternational } = usePhoneValidation();
  const { passwordRules, confirmPasswordRules } = usePasswordValidation();
  const { nicknameRules } = useNicknameValidation();
  const { birthRules, formatBirthForSave } = useBirthValidation();

  const formMethods = useForm<UnifiedSignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      phone: '',
      birth: '',
      password: '',
      confirmPassword: '',
      emailVerificationCode: '',

      isEmailSent: false,
      isEmailVerified: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = formMethods;

  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  const watchEmail = watch('email');
  const watchEmailCode = watch('emailVerificationCode');

  const isEmailSent = watch('isEmailSent');
  const isEmailVerified = watch('isEmailVerified');

  const onSubmit = async (data: UnifiedSignUpFormData) => {
    if (!data.isEmailVerified) {
      error('이메일 인증을 완료해주세요');
      return;
    }

    try {
      // FormData 생성 (서버 액션은 FormData를 받음)
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('nickname', data.nickname);
      formData.append('phone_number', convertToInternational(data.phone)); // phone_number로 변경
      formData.append('birth', formatBirthForSave(data.birth));
      formData.append('password', data.password);
      formData.append('email_verification_code', data.emailVerificationCode);

      // 서버 액션 호출 - signUp은 redirect를 포함하므로 성공하면 페이지 이동됨
      const result = await signUp({ success: false, error: null }, formData);

      // 만약 에러가 있다면 (redirect되지 않은 경우)
      if (result && !result.success) {
        error(result.error || '회원가입 중 오류가 발생했습니다');
      }
    } catch {
      error('회원가입 처리 중 오류가 발생했습니다');
    }
  };

  const handleEmailVerification = async () => {
    if (!watchEmail) {
      error('이메일을 입력해주세요');
      return;
    }

    if (!emailRules.pattern.value.test(watchEmail)) {
      error('올바른 이메일 형식으로 입력해주세요');
      return;
    }

    try {
      const result = await sendEmailCode(watchEmail);

      if (result.success) {
        success(result.message || '이메일 인증번호가 전송되었습니다!');
        setValue('isEmailSent', true);
        setValue('isEmailVerified', false);
      } else {
        error(result.error || '인증번호 전송에 실패했습니다');
      }
    } catch {
      error('인증번호 전송 중 오류가 발생했습니다');
    }
  };

  // 이메일 인증번호 확인
  const handleEmailVerificationConfirm = async () => {
    if (!watchEmailCode?.trim()) {
      error('인증번호를 입력해주세요');
      return;
    }

    try {
      const result = await verifyEmailCode(watchEmail, watchEmailCode);

      if (result.success) {
        success(result.message || '이메일 인증이 완료되었습니다!');
        setValue('isEmailVerified', true);
      } else {
        error(result.error || '인증번호가 올바르지 않습니다');
      }
    } catch {
      error('인증번호 확인 중 오류가 발생했습니다');
    }
  };

  return {
    form: {
      register,
      handleSubmit,
      errors,
      isValid,
    },

    watch: {
      password: watchPassword,
      confirmPassword: watchConfirmPassword,
    },

    state: {
      isEmailSent,
      isEmailVerified,
    },

    rules: {
      emailRules,
      phoneRules,
      passwordRules,
      confirmPasswordRules,
      nicknameRules,
      birthRules,
    },

    handlers: {
      onSubmit,
      handleEmailVerification,
      handleEmailVerificationConfirm,
    },

    toasts,
  };
};
