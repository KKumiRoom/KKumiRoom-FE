import { TRegister } from '@/types/data/TRegister';
import { atom } from 'jotai';
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
  errorMessageAtom,
  currentStepAtom,
  classNumberAtom,
} from './registerForm';

// 폼 데이터 초기화 액션
export const initializeFormAtom = atom(null, (get, set) => {
  set(idAtom, '');
  set(passwordAtom, '');
  set(passwordCheckAtom, '');
  set(nameAtom, '');
  set(birthdayAtom, '');
  set(phoneAtom, '');
  set(addressAtom, '');
  set(schoolRegionAtom, '');
  set(schoolAtom, '');
  set(gradeAtom, '');
  set(classNumberAtom, '');
  set(errorMessageAtom, '');
  set(currentStepAtom, 1); // 첫 번째 단계로 초기화
});

// 폼 제출 액션
export const submitFormAtom = atom(null, async (get) => {
  const formData: TRegister = {
    authId: get(idAtom),
    password: get(passwordAtom),
    name: get(nameAtom),
    birth: get(birthdayAtom),
    phone: get(phoneAtom),
    address: get(addressAtom),
    schoolId: get(schoolAtom),
    grade: get(gradeAtom),
    classNumber: get(classNumberAtom),
  };

  return formData;
});
