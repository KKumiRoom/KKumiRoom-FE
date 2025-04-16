/**
 * 전화번호를 포맷팅합니다. (010-1234-5678 형식)
 */
export function formatPhoneNumber(value: string): string {
  // 숫자만 추출
  const numbersOnly = value.replace(/\D/g, '');

  if (numbersOnly.length <= 3) {
    return numbersOnly;
  }

  if (numbersOnly.length <= 7) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  }

  if (numbersOnly.length <= 11) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7)}`;
  }

  // 11자리를 초과하는 경우 11자리까지만 자르고 포맷팅
  return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷팅합니다.
 */
export function formatDate(value: string): string {
  // 숫자만 추출
  const numbersOnly = value.replace(/\D/g, '');

  if (numbersOnly.length <= 4) {
    return numbersOnly;
  }

  if (numbersOnly.length <= 6) {
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
  }

  return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 6)}-${numbersOnly.slice(6, 8)}`;
}

/**
 * 숫자만 허용하는 포맷터
 */
export function formatNumbersOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * 영문과 숫자만 허용하는 포맷터
 */
export function formatAlphanumeric(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}
