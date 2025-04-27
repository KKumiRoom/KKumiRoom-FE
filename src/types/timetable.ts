import { Subject } from './subject';

/**
 * 과목 유형
 */
export type SubjectType = '공통' | '선택';

/**
 * 요일 타입
 */
export type DayType = '월' | '화' | '수' | '목' | '금';
export type DayEnumType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export const DAY_MAPPING: Record<DayType, DayEnumType> = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
};

/**
 * API로부터 받아오는 수업 정보
 */
export interface Course {
  courseId: number;
  courseName: string;
  courseType: string;
  courseArea: string;
  semester: string;
  description: string;
  maxStudents: number;
  createdAt: string;
}

/**
 * 시간표 과목 정보
 */
export interface TimetableSubject extends Subject {
  /**
   * 과목 이름
   */
  name: string;

  /**
   * 과목 배경색 (Tailwind CSS 클래스명)
   */
  color: string;

  /**
   * 과목 유형 (공통/선택)
   */
  type: SubjectType;

  /**
   * 학기 정보
   */
  semester: string;

  /**
   * 학과/계열 정보
   */
  department: string;

  /**
   * 과목 설명
   */
  description: string;
}

/**
 * 시간표 데이터 구조
 */
export interface TimetableData {
  [day: string]: {
    [period: string]: TimetableSubject;
  };
}

/**
 * 시간표 업데이트 요청 데이터
 */
export interface TimeTableUpdateRequest {
  courseId: number;
  period: number;
  day: DayEnumType;
  semester: number;
}

/**
 * 시간표 색상 목록
 */
export const TIMETABLE_COLORS = [
  'bg-red-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-indigo-100',
  'bg-orange-100',
] as const;

export type TimetableColor = (typeof TIMETABLE_COLORS)[number];
