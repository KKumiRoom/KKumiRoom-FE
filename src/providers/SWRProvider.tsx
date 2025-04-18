'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import { ErrorToast } from '@/lib/utils/notifications';

interface SWRProviderProps {
  children: ReactNode;
}

/**
 * API 에러 인터페이스 정의
 */
export interface ApiError extends Error {
  status?: number;
  info?: Record<string, unknown>;
  code?: string;
}

/**
 * 표준화된 API 에러 생성 유틸리티
 */
export const createApiError = (
  message: string,
  status?: number,
  info?: Record<string, unknown>
): ApiError => {
  const error = new Error(message) as ApiError;
  if (status) error.status = status;
  if (info) error.info = info;
  return error;
};

/**
 * 전역 에러 처리 함수
 * 모든 API 요청 및 SWR 에러를 중앙에서 처리
 */
export const globalErrorHandler = (error: Error): void => {
  // 개발 환경에서는 더 상세한 로깅
  if (process.env.NODE_ENV === 'development') {
    const apiError = error as ApiError;

    ErrorToast(error.message);
    // API 에러에 추가 정보가 있으면 로깅
    if (apiError.status) {
      ErrorToast(`상태 코드: ${apiError.status}`);
    }

    if (apiError.info) {
      ErrorToast(`에러 정보: ${JSON.stringify(apiError.info)}`);
    }

    // 스택 트레이스 로깅 (개발 환경에서만)
    if (error.stack) {
      ErrorToast(`스택 트레이스: ${error.stack}`);
    }
  } else {
    // 프로덕션 환경에서는 최소한의 로깅
    ErrorToast(error.message);
  }
};

/**
 * SWR 설정을 관리하는 전역 프로바이더
 * 모든 SWR 요청에 대한 기본 설정 및 에러 처리를 담당
 */
export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // 포커스 시 자동 재검증 (탭 전환 후 돌아올 때)
        revalidateOnFocus: true,

        // 인터넷 연결 복구 시 자동 재검증
        revalidateOnReconnect: true,

        // 같은 키에 대한 중복 요청 방지 (2초)
        dedupingInterval: 2000,

        // 에러 발생 시 재시도 횟수
        errorRetryCount: 3,

        // 서스펜스 모드 비활성화 (Next.js 13+ 호환성)
        suspense: false,

        // 전역 에러 처리기
        onError: globalErrorHandler,

        // 요청 전 일괄 처리 활성화 (성능 최적화)
        shouldRetryOnError: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
