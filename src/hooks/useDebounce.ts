'use client';

import { useEffect, useRef } from 'react';

/**
 * 함수 호출을 디바운스 처리하는 커스텀 훅
 *
 * @param callback 디바운스 처리할 콜백 함수
 * @param delay 디바운스 지연 시간(ms)
 * @returns 디바운스된 함수 실행과 타이머 관리를 위한 객체
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 디바운스 함수 실행을 취소하는 함수
  const cancelDebounce = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // 디바운스 적용된 함수 실행
  const debounce = (...args: Parameters<T>) => {
    cancelDebounce();

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // 즉시 함수 실행 (디바운스 무시)
  const executeNow = (...args: Parameters<T>) => {
    cancelDebounce();
    callback(...args);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return cancelDebounce;
  }, []);

  return {
    debounce,
    cancelDebounce,
    executeNow,
    timerActive: !!timerRef.current,
  };
}

export default useDebounce;
