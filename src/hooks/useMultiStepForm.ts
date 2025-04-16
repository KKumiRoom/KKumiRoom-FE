'use client';

import { useState } from 'react';

interface UseMultiStepFormProps {
  steps: number;
  initialStep?: number;
}

function useMultiStepForm({ steps, initialStep = 1 }: UseMultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNext = () => {
    if (currentStep < steps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= steps) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === steps,
    goToNext,
    goToPrevious,
    goToStep,
  };
}

export default useMultiStepForm;
