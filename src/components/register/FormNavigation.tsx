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
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

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

  // 회원가입 성공 처리
  const handleSuccess = useCallback(() => {
    /* eslint-disable no-alert */
    alert('회원가입이 완료되었습니다!');
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
      const success = await submitForm();
      if (success) {
        handleSuccess();
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
      >
        이전
      </Button>

      <Button
        fullWidth
        variant='primary'
        size='lg'
        onClick={handleNext}
        type='button'
        disabled={disableNext}
      >
        {isLastStep ? '회원가입' : '다음'}
      </Button>
    </div>
  );
}

export default FormNavigation;
