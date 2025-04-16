/**
 * 유효성 검사 규칙 정의 타입
 */
export interface ValidationRule<T = string> {
  /** 조건이 true일 때 유효성 검사 실패로 간주 */
  condition: (value: T) => boolean;
  /** 유효성 검사 실패 시 보여줄 메시지 */
  message: string;
}
