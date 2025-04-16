import {
  idAtom,
  passwordAtom,
  passwordCheckAtom,
  nameAtom,
  birthdayAtom,
  phoneAtom,
  addressAtom,
  schoolRegionAtom,
  schoolAtom,
  gradeAtom,
} from '@/atoms/register/registerForm';
import RegisterAuth from '@/components/register/RegisterAuth';
import RegisterSchoolInfo from '@/components/register/RegisterSchoolInfo';
import RegisterUserInfo from '@/components/register/RegisterUserInfo';
import { Atom } from 'jotai';
import {
  validateStep1,
  validateStep2,
  validateStep3,
} from '../validation/registerValidationRule';

// 단계 구성 인터페이스
export interface StepConfig {
  component: React.ComponentType;
  validate: (...args: string[]) => string;
  title: string;
  description: string;
}

// 단계별 데이터 인터페이스
export interface StepAtomsConfig {
  atoms: Atom<string>[];
  component: React.ComponentType;
  title: string;
  description: string;
  validate: (...args: string[]) => string;
}

// 각 단계별 필요한 atom 그룹 및 컴포넌트
export const STEP_ATOMS: Record<number, StepAtomsConfig> = {
  1: {
    atoms: [idAtom, passwordAtom, passwordCheckAtom],
    component: RegisterAuth,
    title: '계정 정보',
    description: '아이디와 비밀번호를 입력해주세요',
    validate: validateStep1,
  },
  2: {
    atoms: [nameAtom, birthdayAtom, phoneAtom, addressAtom],
    component: RegisterUserInfo,
    title: '개인 정보',
    description: '이름, 생일, 휴대폰 번호, 주소를 입력해주세요',
    validate: validateStep2,
  },
  3: {
    atoms: [schoolRegionAtom, schoolAtom, gradeAtom],
    component: RegisterSchoolInfo,
    title: '학교 정보',
    description: '학교 지역, 학교 이름, 학년을 입력해주세요',
    validate: validateStep3,
  },
};

// 등록 단계 정의 (STEP_ATOMS에서 필요한 정보만 추출)
export const REGISTER_STEPS: Record<number, StepConfig> = Object.entries(
  STEP_ATOMS
).reduce(
  (steps, [key, config]) => ({
    ...steps,
    [key]: {
      component: config.component,
      validate: config.validate,
      title: config.title,
      description: config.description,
    },
  }),
  {}
);

// 최대 단계 수
export const MAX_STEP = Object.keys(REGISTER_STEPS).length;

// 단계가 유효한지 확인
export const isValidStep = (step: number): boolean => {
  return step >= 1 && step <= MAX_STEP;
};
