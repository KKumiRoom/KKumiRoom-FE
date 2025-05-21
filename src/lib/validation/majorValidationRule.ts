import { TUser } from '@/types';

interface MajorValidationParams {
  selectedType: number;
  selectedDepartment: number;
  user: TUser | null;
  departmentOptions: Array<{ id: number; name: string }>;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

/**
 * 계열 선택 유효성 검사
 * @param selectedType 선택된 계열 ID
 */
export const validateType = (selectedType: number): ValidationResult => {
  if (selectedType === -1) {
    return {
      isValid: false,
      errorMessage: '계열을 선택하세요.',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

/**
 * 학과 선택 유효성 검사
 * @param selectedDepartment 선택된 학과 ID
 * @param departmentOptions 선택 가능한 학과 목록
 */
export const validateDepartment = (
  selectedDepartment: number,
  departmentOptions: Array<{ id: number; name: string }>
): ValidationResult => {
  if (selectedDepartment === -1) {
    return {
      isValid: false,
      errorMessage: '학과를 선택하세요.',
    };
  }

  const selectedMajor = departmentOptions.find(
    (dept) => dept.id === selectedDepartment
  );
  if (!selectedMajor) {
    return {
      isValid: false,
      errorMessage: '선택된 학과를 찾을 수 없습니다.',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

/**
 * 기존 학과와 동일 여부 검사
 * @param selectedDepartment 선택된 학과 ID
 * @param user 현재 사용자 정보
 */
export const validateSameMajor = (
  selectedDepartment: number,
  user: TUser | null
): ValidationResult => {
  if (user?.interestMajor?.majorId === selectedDepartment) {
    return {
      isValid: false,
      errorMessage: '기존 학과와 같습니다.',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

/**
 * 관심학과 선택 전체 유효성 검사
 * @param params 유효성 검사에 필요한 파라미터
 */
export const validateMajorSelection = ({
  selectedType,
  selectedDepartment,
  user,
  departmentOptions,
}: MajorValidationParams): ValidationResult => {
  // 계열 선택 검사
  const typeValidation = validateType(selectedType);
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  // 학과 선택 검사
  const departmentValidation = validateDepartment(
    selectedDepartment,
    departmentOptions
  );
  if (!departmentValidation.isValid) {
    return departmentValidation;
  }

  // 기존 학과와 동일 여부 검사
  const sameMajorValidation = validateSameMajor(selectedDepartment, user);
  if (!sameMajorValidation.isValid) {
    return sameMajorValidation;
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};
