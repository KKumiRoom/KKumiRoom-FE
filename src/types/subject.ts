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
  title: string;

  /**
   * 과목 유형 (공통/선택)
   */
  type: SubjectType;

  /**
   * 과목 코드
   */
  code: string;

  /**
   * 추가적인 과목 정보는 필요에 따라 확장 가능
   */
}
