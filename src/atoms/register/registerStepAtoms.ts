import { atom } from 'jotai';
import { MAX_STEP } from '@/lib/models/registerSteps';
import { currentStepAtom, errorMessageAtom } from './registerForm';

// 단계 이동 관련 헬퍼 atoms
export const isFirstStepAtom = atom((get) => get(currentStepAtom) === 1);
export const isLastStepAtom = atom((get) => get(currentStepAtom) === MAX_STEP);

// 다음 단계로 이동 액션
export const goToNextStepAtom = atom(
  null,
  (get, set, validationFn: () => string) => {
    // 유효성 검사 실행
    const validationError = validationFn();

    if (validationError) {
      set(errorMessageAtom, validationError);
      return false;
    }

    const step = get(currentStepAtom);
    if (step < MAX_STEP) {
      set(currentStepAtom, step + 1);
      set(errorMessageAtom, '');
      return true;
    }

    return false;
  }
);

// 이전 단계로 이동 액션
export const goToPrevStepAtom = atom(null, (get, set) => {
  const step = get(currentStepAtom);
  if (step > 1) {
    set(currentStepAtom, step - 1);
    set(errorMessageAtom, '');
    return true;
  }

  return false;
});
