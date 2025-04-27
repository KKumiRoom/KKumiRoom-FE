/**
 * 타입 인덱스 파일
 * 주요 타입들을 모아서 재내보냅니다.
 */
// 데이터 API 응답 타입
import { TMajorInfo } from './data/users';
import type { Subject } from './subject';
// 도메인 모델 타입 - 값 내보내기
import { TIMETABLE_COLORS } from './timetable';
// 타입 내보내기
import type {
  TimetableData,
  TimetableSubject,
  TimetableColor,
  TimeTableUpdateRequest,
} from './timetable';

export * from './data/users';
export * from './data/timeTable';

// 공통 타입
export * from './ApiResponse';

export { TIMETABLE_COLORS };

export type {
  TimetableData,
  TimetableSubject,
  TimetableColor,
  TimeTableUpdateRequest,
  Subject,
};

// 사용자 정의 타입
export interface TUser {
  name: string;
  profileImage: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  interestMajor: TMajorInfo | null;
  school: {
    schoolId: number;
    name: string;
    homepage: string;
  };
  grade: string;
  class: string;
}

export type BadgeVariant = 'selected' | 'previous' | 'next';
