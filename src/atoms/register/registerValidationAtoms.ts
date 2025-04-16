import { ValidationRule } from '@/types/validationType';
import { atom, useAtom, useAtomValue, Atom } from 'jotai';
import { useEffect } from 'react';
import { REGISTER_STEPS, STEP_ATOMS } from '@/lib/models/registerSteps';
import { currentStepAtom, errorMessageAtom } from './registerForm';

// 각 단계별 데이터를 수집하는 선택자 atom
export const step1DataAtom = atom((get) => {
  const { atoms } = STEP_ATOMS[1];
  return {
    id: get(atoms[0]),
    password: get(atoms[1]),
    passwordCheck: get(atoms[2]),
  };
});

export const step2DataAtom = atom((get) => {
  const { atoms } = STEP_ATOMS[2];
  return {
    name: get(atoms[0]),
    birthday: get(atoms[1]),
    phone: get(atoms[2]),
    address: get(atoms[3]),
  };
});

export const step3DataAtom = atom((get) => {
  const { atoms } = STEP_ATOMS[3];
  return {
    schoolRegion: get(atoms[0]),
    school: get(atoms[1]),
    grade: get(atoms[2]),
  };
});

// 현재 단계의 유효성 검사 결과를 선택하는 atom
export const currentValidationResultAtom = atom((get) => {
  const currentStep = get(currentStepAtom);
  const stepConfig = REGISTER_STEPS[currentStep];

  if (!stepConfig) return '';

  // 해당 단계의 atom 값들 가져오기
  const stepAtomsConfig = STEP_ATOMS[currentStep as keyof typeof STEP_ATOMS];
  if (!stepAtomsConfig) return '';

  const params = stepAtomsConfig.atoms.map((a) => get(a));
  return stepConfig.validate(...params);
});

// 버튼 비활성화 상태
export const disableNextAtom = atom((get) => {
  return get(currentValidationResultAtom) !== '';
});

// 실시간 유효성 검사를 적용하는 커스텀 훅 (에러 메시지 바인딩)
export function useFormValidationEffect() {
  const [currentStep] = useAtom(currentStepAtom);
  const [validationResult] = useAtom(currentValidationResultAtom);
  const [, setErrorMessage] = useAtom(errorMessageAtom);

  // 현재 단계 또는 검증 결과가 변경될 때마다 에러 메시지 업데이트
  useEffect(() => {
    setErrorMessage(validationResult);
  }, [validationResult, currentStep, setErrorMessage]);
}

// 현재 유효성 검사 결과만 반환하는 훅
export function useValidationResult() {
  return useAtomValue(currentValidationResultAtom);
}

// 이전 버전과의 호환성을 위한 훅
export function useFormValidation() {
  useFormValidationEffect();
  return useValidationResult();
}

// 특정 필드의 유효성 검사 규칙을 적용하는 통합 커스텀 훅
export function useFieldValidation<T>(
  fieldAtom: Atom<T>,
  rules: ValidationRule<T>[]
) {
  const [fieldValue] = useAtom(fieldAtom);
  const [, setErrorMessage] = useAtom(errorMessageAtom);

  useEffect(() => {
    // array.some을 사용하여 for 루프 대신 함수형으로 처리
    const hasError = rules.some((rule) => {
      if (rule.condition(fieldValue)) {
        setErrorMessage(rule.message);
        return true;
      }
      return false;
    });

    if (!hasError) {
      setErrorMessage('');
    }
  }, [fieldValue, rules, setErrorMessage]);
}
