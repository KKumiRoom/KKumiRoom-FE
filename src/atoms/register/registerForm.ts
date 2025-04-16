import { atom } from 'jotai';
import { formatPhoneNumber } from '@/lib/utils/formatters';

// Step 1: 계정 정보 atoms
export const idAtom = atom<string>('');
export const passwordAtom = atom<string>('');
export const passwordCheckAtom = atom<string>('');

// Step 2: 개인 정보 atoms
export const nameAtom = atom<string>('');
export const birthdayAtom = atom<string>('');
export const phoneAtom = atom<string>('');
export const addressAtom = atom<string>('');

// Step 3: 학교 정보 atoms
export const schoolRegionAtom = atom<string>('');
export const schoolAtom = atom<string>('');
export const gradeAtom = atom<string>('');

// UI 상태 atoms
export const currentStepAtom = atom<number>(1);
export const errorMessageAtom = atom<string>('');

// 전화번호 포맷팅을 위한 atom
export const formattedPhoneAtom = atom(
  (get) => get(phoneAtom),
  (get, set, value: string) => {
    const formattedValue = formatPhoneNumber(value);
    set(phoneAtom, formattedValue);
  }
);
