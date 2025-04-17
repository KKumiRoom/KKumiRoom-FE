import { Subject, SubjectType } from '@/types/subject';

// 학교 지역 리스트
export const SCHOOL_REGIONS = ['서울', '인천', '경기'];

// 지역별 학교 리스트
export const SCHOOLS_BY_REGION: Record<string, string[]> = {
  서울: ['서울대학교', '연세대학교', '고려대학교', '서강대학교', '한양대학교'],
  인천: ['인천대학교', '인하대학교', '경인교육대학교'],
  경기: ['성균관대학교', '아주대학교', '한국외국어대학교', '경희대학교'],
};

// 학년 리스트
export const GRADES = ['1학년', '2학년', '3학년'];

// 과목 데이터
export const SUBJECTS: Subject[] = [
  {
    title: '공통수학I',
    type: '공통' as SubjectType,
    code: 'M1',
  },
  {
    title: '공통수학II',
    type: '공통' as SubjectType,
    code: 'M2',
  },
  {
    title: '지구과학I',
    type: '선택' as SubjectType,
    code: 'Z1',
  },
  {
    title: '공통국어I',
    type: '공통' as SubjectType,
    code: 'K1',
  },
  {
    title: '영어',
    type: '공통' as SubjectType,
    code: 'E1',
  },
  {
    title: '동아시아사',
    type: '선택' as SubjectType,
    code: 'D1',
  },
  {
    title: '꽃꽂이',
    type: '선택' as SubjectType,
    code: 'F1',
  },
  {
    title: '문학',
    type: '선택' as SubjectType,
    code: 'L1',
  },
];
