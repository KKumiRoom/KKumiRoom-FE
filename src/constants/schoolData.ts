import { Subject, SubjectType } from '@/types/subject';

// 교육청 리스트
export const EDUCATION_OFFICES = [
  { name: '서울특별시교육청', code: 'B10', region: '서울' },
  { name: '부산광역시교육청', code: 'C10', region: '부산' },
  { name: '대구광역시교육청', code: 'D10', region: '대구' },
  { name: '인천광역시교육청', code: 'E10', region: '인천' },
  { name: '광주광역시교육청', code: 'F10', region: '광주' },
  { name: '대전광역시교육청', code: 'G10', region: '대전' },
  { name: '울산광역시교육청', code: 'H10', region: '울산' },
  { name: '세종특별자치시교육청', code: 'I10', region: '세종' },
  { name: '경기도교육청', code: 'J10', region: '경기' },
  { name: '강원특별자치도교육청', code: 'K10', region: '강원' },
  { name: '충청북도교육청', code: 'M10', region: '충북' },
  { name: '충청남도교육청', code: 'N10', region: '충남' },
  { name: '전북특별자치도교육청', code: 'P10', region: '전북' },
  { name: '전라남도교육청', code: 'Q10', region: '전남' },
  { name: '경상북도교육청', code: 'R10', region: '경북' },
  { name: '경상남도교육청', code: 'S10', region: '경남' },
  { name: '제주특별자치도교육청', code: 'T10', region: '제주' },
];

// 학년 리스트
export const GRADES = ['1학년', '2학년', '3학년'];

// 과목 데이터
export const SUBJECTS: Subject[] = [
  {
    name: '공통수학I',
    type: '공통' as SubjectType,
    code: 'M1',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '공통수학I 설명',
  },
  {
    name: '공통수학II',
    type: '공통' as SubjectType,
    code: 'M2',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '공통수학II 설명',
  },
  {
    name: '지구과학I',
    type: '선택' as SubjectType,
    code: 'Z1',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '지구과학I 설명',
  },
  {
    name: '공통국어I',
    type: '공통' as SubjectType,
    code: 'K1',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '공통국어I 설명',
  },
  {
    name: '영어',
    type: '공통' as SubjectType,
    code: 'E1',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '영어 설명',
  },
  {
    name: '동아시아사',
    type: '선택' as SubjectType,
    code: 'D1',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '동아시아사 설명',
  },
  {
    name: '꽃꽂이',
    type: '선택' as SubjectType,
    code: 'F1',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '꽃꽂이 설명',
  },
  {
    name: '문학',
    type: '선택' as SubjectType,
    code: 'L1',
    teacher: '김영호',
    semester: '1학년 1학기',
    department: '일반',
    description: '문학 설명',
  },
];
