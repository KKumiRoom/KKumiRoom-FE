/**
 * 과목 관련 타입 정의
 */

/**
 * 과목 유형 (공통/선택)
 */
export type SubjectType = '공통' | '선택';

/**
 * 과목 기본 정보
 */
export interface Subject {
  /**
   * 과목명
   */
  name: string;

  /**
   * 과목 유형 (공통/선택)
   */
  type: SubjectType;

  /**
   * 과목 코드
   */
  code: string;

  /**
   * 담당 교사
   */
  teacher: string;

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
