import { currentStepAtom } from '@/atoms/register/registerForm';
import { useAtomValue } from 'jotai';

interface RegisterStepIndicatorProps {
  totalSteps: number;
  stepTitles?: string[];
}

function RegisterStepIndicator({
  totalSteps,
  stepTitles = [],
}: RegisterStepIndicatorProps) {
  const currentStep = useAtomValue(currentStepAtom);

  // 단계 상태에 따른 클래스 결정 함수
  const getStepClasses = (step: number) => {
    if (step === currentStep) {
      return 'bg-primary text-cloud';
    }
    if (step < currentStep) {
      return 'bg-primary/20 text-primary';
    }
    return 'bg-grey/20 text-grey';
  };

  return (
    <div className='w-full flex justify-between items-center my-6 relative'>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const stepTitle = stepTitles[i] || `단계 ${step}`;

        return (
          <div key={step} className='flex flex-col items-center w-1/3 z-10'>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${getStepClasses(step)}`}
            >
              {step}
            </div>
            <span
              className={`text-xs text-center ${isActive ? 'font-bold text-primary' : 'text-grey'}`}
            >
              {stepTitle}
            </span>
          </div>
        );
      })}

      <div className='absolute top-4 left-0 w-full h-0.5 -z-0'>
        <div className='flex w-full'>
          {Array.from({ length: totalSteps - 1 }, (_, i) => {
            const segmentStep = i + 2;
            return (
              <div
                key={i}
                className={`flex-1 h-full ${currentStep >= segmentStep ? 'bg-primary' : 'bg-grey/20'}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RegisterStepIndicator;
