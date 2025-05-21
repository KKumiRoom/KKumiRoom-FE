// src/lib/validation/schoolValidationRule.ts
import { TUser } from '@/types';
import { TSchoolList } from '@/types/data/TSchoolList';

interface SchoolValidationParams {
  selectedOffice: number;
  selectedSchool: number;
  user: TUser | null;
  schoolOptions: TSchoolList;
  grade: number;
  classNum: number;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

/**
 * 교육청 선택 유효성 검사
 */
export const validateOffice = (selectedOffice: number): ValidationResult => {
  if (selectedOffice === -1) {
    return {
      isValid: false,
      errorMessage: '교육청을 선택하세요.',
    };
  }
  return { isValid: true, errorMessage: '' };
};

/**
 * 학교 선택 유효성 검사
 */
export const validateSchool = (
  selectedSchool: number,
  schoolOptions: TSchoolList
): ValidationResult => {
  if (selectedSchool === -1) {
    return {
      isValid: false,
      errorMessage: '학교를 선택하세요.',
    };
  }

  const selectedSchoolInfo = schoolOptions.find(
    (school) => school.schoolId === selectedSchool
  );
  if (!selectedSchoolInfo) {
    return {
      isValid: false,
      errorMessage: '선택된 학교를 찾을 수 없습니다.',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

/**
 * 학년 유효성 검사
 */
export const validateGrade = (grade: number): ValidationResult => {
  if (grade === -1) {
    return {
      isValid: false,
      errorMessage: '학년을 입력하세요.',
    };
  }

  if (grade < 1 || grade > 3) {
    return {
      isValid: false,
      errorMessage: '1~3학년 중 하나를 입력하세요.',
    };
  }

  return { isValid: true, errorMessage: '' };
};

/**
 * 반 유효성 검사
 */
export const validateClassNum = (classNum: number): ValidationResult => {
  if (classNum === -1) {
    return {
      isValid: false,
      errorMessage: '반을 입력하세요.',
    };
  }

  if (classNum < 1 || classNum > 20) {
    return {
      isValid: false,
      errorMessage: '1~20반 중 하나를 입력하세요.',
    };
  }

  return { isValid: true, errorMessage: '' };
};

/**
 * 기존 학교 정보와 동일 여부 검사
 */
export const validateSameSchoolInfo = (
  selectedSchool: number,
  grade: number,
  classNum: number,
  user: TUser | null
): ValidationResult => {
  const userGrade = user?.grade ? parseInt(user.grade, 10) : -1;
  const userClassNum = user?.classNum ? parseInt(user.classNum, 10) : -1;

  if (
    user?.school?.schoolId === selectedSchool &&
    userGrade === grade &&
    userClassNum === classNum
  ) {
    return {
      isValid: false,
      errorMessage: '기존 학교 정보와 동일합니다.',
    };
  }

  return { isValid: true, errorMessage: '' };
};

/**
 * 학교 선택 전체 유효성 검사
 */
export const validateSchoolSelection = ({
  selectedOffice,
  selectedSchool,
  user,
  schoolOptions,
  grade,
  classNum,
}: SchoolValidationParams): ValidationResult => {
  const officeValidation = validateOffice(selectedOffice);
  if (!officeValidation.isValid) {
    return officeValidation;
  }

  const schoolValidation = validateSchool(selectedSchool, schoolOptions);
  if (!schoolValidation.isValid) {
    return schoolValidation;
  }

  const gradeValidation = validateGrade(grade);
  if (!gradeValidation.isValid) {
    return gradeValidation;
  }

  const classNumValidation = validateClassNum(classNum);
  if (!classNumValidation.isValid) {
    return classNumValidation;
  }

  const sameSchoolInfoValidation = validateSameSchoolInfo(
    selectedSchool,
    grade,
    classNum,
    user
  );
  if (!sameSchoolInfoValidation.isValid) {
    return sameSchoolInfoValidation;
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};
