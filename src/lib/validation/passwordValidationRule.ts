import { ValidationRule } from '@/types/validationType';

// 유효성 검사 규칙을 실행하는 함수
export function validateField<T>(value: T, rules: ValidationRule<T>[]): string {
  const failedRule = rules.find((rule) => rule.condition(value));
  return failedRule ? failedRule.message : '';
}

// 여러 필드의 유효성 검사 결과를 결합하는 함수
export function combineValidations(...validations: string[]): string {
  return validations.find((v) => v !== '') || '';
}

// 공통 비밀번호 유효성 검사 규칙 생성 함수
export const createPasswordValidationRules = (
  title: string
): ValidationRule<string>[] => [
  { condition: (v: string) => !v, message: `${title}를 입력해주세요.` },
  {
    condition: (v: string) => v.length < 8,
    message: `${title}는 8자 이상이어야 합니다.`,
  },
  {
    condition: (v: string) => !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v),
    message: `${title}는 영문과 숫자를 포함해야 합니다.`,
  },
];

// 비밀번호 확인 유효성 검사 규칙 생성 함수
export const createPasswordConfirmValidationRules = (
  password: string,
  title: string
): ValidationRule<string>[] => [
  { condition: (v: string) => !v, message: `${title}를 입력해주세요.` },
  {
    condition: (v: string) => v !== password,
    message: '비밀번호가 일치하지 않습니다.',
  },
];

// 비밀번호 변경 유효성 검사
export function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  newPasswordConfirm: string
): string {
  const currentPasswordValidation = validateField(
    currentPassword,
    createPasswordValidationRules('현재 비밀번호')
  );

  const newPasswordValidation = validateField(newPassword, [
    ...createPasswordValidationRules('새 비밀번호'),
    {
      condition: (v: string) => v === currentPassword,
      message: '현재 비밀번호와 다른 비밀번호를 입력해주세요.',
    },
  ]);

  const newPasswordConfirmValidation = validateField(
    newPasswordConfirm,
    createPasswordConfirmValidationRules(newPassword, '새 비밀번호 확인')
  );

  return combineValidations(
    currentPasswordValidation,
    newPasswordValidation,
    newPasswordConfirmValidation
  );
}
