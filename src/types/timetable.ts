/**
 * 과목 유형
 */
export type SubjectType = '공통' | '선택';

/**
 * 시간표 과목 정보
 */
export interface TimetableSubject {
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
   * 담당 교사
   */
  teacher?: string;

  /**
   * 학기 정보
   */
  semester?: string;

  /**
   * 학과/계열 정보
   */
  department?: string;

  /**
   * 과목 설명
   */
  description?: string;
}

/**
 * 시간표 데이터 구조
 */
export interface TimetableData {
  [day: string]: {
    [period: string]: TimetableSubject;
  };
}
