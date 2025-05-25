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

// 프로필 정보 유효성 검사
export function validateProfile(
  userName: string,
  birth: string,
  phone: string,
  address: string,
  originalUserName: string,
  originalBirth: string,
  originalPhone: string,
  originalAddress: string
): string {
  const userNameValidation = validateField(userName, [
    { condition: (v: string) => !v, message: '이름을 입력해주세요.' },
  ]);

  const birthValidation = validateField(birth, [
    { condition: (v: string) => !v, message: '생년월일을 입력해주세요.' },
    {
      condition: (v: string) => !/^\d{4}-\d{2}-\d{2}$/.test(v),
      message: '생년월일은 YYYY-MM-DD 형식으로 입력해주세요.',
    },
  ]);

  const phoneValidation = validateField(phone, [
    { condition: (v: string) => !v, message: '전화번호를 입력해주세요.' },
    {
      condition: (v: string) => !/^010-\d{4}-\d{4}$/.test(v),
      message: '전화번호는 010-0000-0000 형식으로 입력해주세요.',
    },
  ]);

  const addressValidation = validateField(address, [
    { condition: (v: string) => !v, message: '주소를 입력해주세요.' },
  ]);

  const sameInfoValidation = validateField(
    { userName, birth, phone, address },
    [
      {
        condition: (v) =>
          v.userName === originalUserName &&
          v.birth === originalBirth &&
          v.phone === originalPhone &&
          v.address === originalAddress,
        message: '이전 사용자 정보와 같습니다',
      },
    ]
  );

  return combineValidations(
    userNameValidation,
    birthValidation,
    phoneValidation,
    addressValidation,
    sameInfoValidation
  );
}
