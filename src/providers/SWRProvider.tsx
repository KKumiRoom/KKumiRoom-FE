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
    ErrorToast('정보를 불러오는데 실패했습니다');
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
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
        errorRetryCount: 0,
        suspense: false,
        onError: globalErrorHandler,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
