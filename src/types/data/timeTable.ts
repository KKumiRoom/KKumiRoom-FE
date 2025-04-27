/**
 * 시간표 관련 API 응답 타입
 */

/**
 * API에서 반환되는 시간표 정보 DTO
 */
export interface TTimeTableResponse {
  courseId: number;
  courseName: string;
  courseType: string;
  period: number;
  day: string;
  semester: string;
}

/**
 * API에서 반환되는 과목 정보 DTO
 */
export interface TCourseResponse {
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
 * 요일 코드 (영문)
 */
export type TDayCode = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

/**
 * 요일 코드 매핑 (숫자 -> 영문)
 */
export const DAY_CODE_MAP: Record<number, TDayCode> = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
};
