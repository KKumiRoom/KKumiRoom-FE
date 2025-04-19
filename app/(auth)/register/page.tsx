'use client';

import { initializeFormAtom } from '@/atoms/register/registerActionAtoms';
import {
  currentStepAtom,
  errorMessageAtom,
} from '@/atoms/register/registerForm';
import { useFormValidationEffect } from '@/atoms/register/registerValidationAtoms';
import FormNavigation from '@/components/containers/FormNavigation';
import RegisterStepIndicator from '@/components/organisms/RegisterStepIndicator';
import useSchoolData from '@/hooks/useSchoolData';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MAX_STEP, REGISTER_STEPS } from '@/lib/models/registerSteps';

function RegisterPage() {
  const [currentStep] = useAtom(currentStepAtom);
  const [, initForm] = useAtom(initializeFormAtom);
  useFormValidationEffect();
  const displayErrorMessage = useAtomValue(errorMessageAtom);
  const router = useRouter();

  // 페이지 로딩 시 초기화 및 학교 데이터 로드
  useSchoolData();
  useEffect(() => {
    initForm();
  }, [initForm]);

  const goToLogin = () => {
    router.push('/login');
  };

  // 현재 단계 컴포넌트 가져오기
  const CurrentStepComponent = REGISTER_STEPS[currentStep].component;

  // 단계 제목 배열 생성
  const stepTitles = Object.values(REGISTER_STEPS).map((step) => step.title);

  return (
    <div className='relative min-h-screen pb-[110px]'>
      <div className='w-[90%] mx-auto pt-20 flex flex-col gap-4'>
        <RegisterStepIndicator totalSteps={MAX_STEP} stepTitles={stepTitles} />
        <CurrentStepComponent />
      </div>
      <div className='fixed bottom-[40px] left-0 right-0 w-[90%] mx-auto'>
        {displayErrorMessage && (
          <div className='mb-3'>
            <p className='text-warning text-sm text-center font-medium'>
              {displayErrorMessage}
            </p>
          </div>
        )}
        <FormNavigation onFirstStep={goToLogin} />
      </div>
    </div>
  );
}
export default RegisterPage;
