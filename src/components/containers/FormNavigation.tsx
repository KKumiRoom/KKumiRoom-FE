import { submitFormAtom } from '@/atoms/register/registerActionAtoms';
import {
  isFirstStepAtom,
  isLastStepAtom,
  goToPrevStepAtom,
  goToNextStepAtom,
} from '@/atoms/register/registerStepAtoms';
import {
  disableNextAtom,
  currentValidationResultAtom,
} from '@/atoms/register/registerValidationAtoms';
import Button from '@/components/atoms/Button';
import useAuth from '@/hooks/useAuth';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { ErrorToast, SuccessToast } from '@/lib/utils/notifications';

interface FormNavigationProps {
  onFirstStep?: () => void; // 로그인 페이지로 이동하는 콜백 (선택적)
}

function FormNavigation({ onFirstStep }: FormNavigationProps) {
  const router = useRouter();
  const isFirstStep = useAtomValue(isFirstStepAtom);
  const isLastStep = useAtomValue(isLastStepAtom);
  const [, goToPrevStep] = useAtom(goToPrevStepAtom);
  const [, goToNextStep] = useAtom(goToNextStepAtom);
  const [, submitForm] = useAtom(submitFormAtom);
  const disableNext = useAtomValue(disableNextAtom);
  const validationResult = useAtomValue(currentValidationResultAtom);
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 회원가입 성공 처리
  const handleSuccess = useCallback(() => {
    SuccessToast('회원가입이 완료되었습니다!');
    router.push('/login');
  }, [router]);

  // 첫 단계에서는 로그인 페이지로 이동
  const handlePrevious = () => {
    if (isFirstStep) {
      if (onFirstStep) {
        onFirstStep();
      } else {
        router.push('/login');
      }
    } else {
      goToPrevStep();
    }
  };

  // 마지막 단계에서는 폼 제출
  const handleNext = async () => {
    if (isLastStep) {
      setIsSubmitting(true);
      try {
        const formData = await submitForm();
        if (formData) {
          const result = await register(formData);
          if (result.success) {
            handleSuccess();
          }
        }
      } catch (error) {
        ErrorToast(`회원가입 중 오류가 발생했습니다.${error}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      goToNextStep(() => validationResult);
    }
  };

  return (
    <div className='flex gap-4'>
      <Button
        fullWidth
        variant='gray'
        size='lg'
        onClick={handlePrevious}
        type='button'
        disabled={isSubmitting}
      >
        이전
      </Button>

      <Button
        fullWidth
        variant='primary'
        size='lg'
        onClick={handleNext}
        type='button'
        disabled={disableNext || isSubmitting}
      >
        {isLastStep ? '회원가입' : '다음'}
      </Button>
    </div>
  );
}

export default FormNavigation;
