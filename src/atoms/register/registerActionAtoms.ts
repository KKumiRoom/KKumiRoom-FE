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
export const submitFormAtom = atom(null, async (get, set) => {
  // 모든 폼 데이터 수집
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const formData = {
    id: get(idAtom),
    password: get(passwordAtom),
    name: get(nameAtom),
    birthday: get(birthdayAtom),
    phone: get(phoneAtom),
    address: get(addressAtom),
    schoolRegion: get(schoolRegionAtom),
    school: get(schoolAtom),
    grade: get(gradeAtom),
    classNumber: get(classNumberAtom),
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  try {
    // API 호출 로직
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    // const data = await response.json();
    // if (!response.ok) throw new Error(data.message || '회원가입 중 오류가 발생했습니다.');

    // 개발 중이므로 콘솔 로그 대신 더미 처리
    // console.log('Form Data Submitted:', formData);

    // TODO: API 연동 시 아래 주석 해제
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    // 성공 시 처리
    return true;
  } catch (error) {
    set(
      errorMessageAtom,
      error instanceof Error
        ? error.message
        : '회원가입 중 오류가 발생했습니다.'
    );
    return false;
  }
});
