import { ValidationRule } from '@/types/validationType';

// 유효성 검사 규칙을 실행하는 함수
export function validateField<T>(value: T, rules: ValidationRule<T>[]): string {
  // find를 사용하여 반복문 대신 함수형으로 처리
  const failedRule = rules.find((rule) => rule.condition(value));
  return failedRule ? failedRule.message : '';
}

// 여러 필드의 유효성 검사 결과를 결합하는 함수
export function combineValidations(...validations: string[]): string {
  return validations.find((v) => v !== '') || '';
}

// 1단계 - 계정 정보 유효성 검사
export function validateStep1(
  id: string,
  password: string,
  passwordCheck: string
): string {
  const idValidation = validateField(id, [
    { condition: (v: string) => !v, message: '아이디를 입력해주세요.' },
    {
      condition: (v: string) => v.length < 4,
      message: '아이디는 최소 4자 이상이어야 합니다.',
    },
  ]);

  const passwordValidation = validateField(password, [
    { condition: (v: string) => !v, message: '비밀번호를 입력해주세요.' },
    {
      condition: (v: string) => v.length < 8,
      message: '비밀번호는 8자 이상이어야 합니다.',
    },
    {
      condition: (v: string) =>
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v),
      message: '비밀번호는 영문과 숫자를 포함해야 합니다.',
    },
  ]);

  const passwordCheckValidation = validateField(passwordCheck, [
    { condition: (v: string) => !v, message: '비밀번호 확인을 입력해주세요.' },
    {
      condition: (v: string) => v !== password,
      message: '비밀번호가 일치하지 않습니다.',
    },
  ]);

  return combineValidations(
    idValidation,
    passwordValidation,
    passwordCheckValidation
  );
}

// 2단계 - 개인 정보 유효성 검사
export function validateStep2(
  name: string,
  birthday: string,
  phone: string,
  address: string
): string {
  const nameValidation = validateField(name, [
    { condition: (v: string) => !v, message: '이름을 입력해주세요.' },
  ]);

  const birthdayValidation = validateField(birthday, [
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

  return combineValidations(
    nameValidation,
    birthdayValidation,
    phoneValidation,
    addressValidation
  );
}

// 3단계 - 학교 정보 유효성 검사
const MAX_CLASS_NUMBER = 10;
export function validateStep3(
  schoolRegion: string,
  school: string,
  grade: string,
  classNumber: string
): string {
  const schoolRegionValidation = validateField(schoolRegion, [
    { condition: (v: string) => !v, message: '학교 지역을 선택해주세요.' },
  ]);

  const schoolValidation = validateField(school, [
    { condition: (v: string) => !v, message: '학교를 선택해주세요.' },
  ]);

  const gradeValidation = validateField(grade, [
    { condition: (v: string) => !v, message: '학년을 선택해주세요.' },
  ]);

  const classNumberValidation = validateField(classNumber, [
    { condition: (v: string) => !v, message: '반을 입력해주세요.' },
    {
      condition: (v: string) => +v > MAX_CLASS_NUMBER,
      message: `반은 최대 ${MAX_CLASS_NUMBER}반 입니다.`,
    },
  ]);

  return combineValidations(
    schoolRegionValidation,
    schoolValidation,
    gradeValidation,
    classNumberValidation
  );
}
