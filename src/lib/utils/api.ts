import { createApiError } from '@/providers/SWRProvider';
import { ErrorToast } from './notifications';

const isServer = () => typeof window === 'undefined';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * 액세스 토큰 갱신 함수
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      // 토큰 갱신 실패 시에만 로그인으로 이동
      if (!isServer()) {
        window.location.href = '/login';
      }
      return false;
    }
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    ErrorToast(`토근 갱신을 실패했습니다.`);
    // 에러 발생 시에도 로그인으로 이동
    if (!isServer()) {
      window.location.href = '/login';
    }
    return false;
  }
};

/**
 * SWR에서 사용할 기본 fetcher 함수
 * API 응답 형식에 맞게 에러 처리 및 데이터 파싱
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 토큰 만료 처리 (401)
  if (response.status === 401) {
    const refreshSuccess = await refreshAccessToken();

    if (refreshSuccess) {
      // 토큰 갱신 성공 시 재시도
      const retryResponse = await fetch(fullUrl, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!retryResponse.ok) {
        throw createApiError(
          '요청 처리 중 오류가 발생했습니다',
          retryResponse.status
        );
      }

      return retryResponse.json();
    }
    // 토큰 갱신 실패 시 에러 throw (이미 refreshAccessToken에서 로그인으로 이동)
    throw createApiError('토큰 갱신에 실패했습니다', 401);
  }

  // 권한 없음 처리 (403)
  if (response.status === 403) {
    if (!isServer()) {
      window.location.href = '/login';
    }
    throw createApiError('접근 권한이 없습니다', 403);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createApiError(
      errorData.message || '요청 처리 중 오류가 발생했습니다',
      response.status,
      errorData
    );
  }

  return response.json();
};

/**
 * POST 요청 전송을 위한 함수
 * @param url API 엔드포인트 URL
 * @param data 요청 본문 데이터
 * @param retryCount 재시도 횟수 (내부적으로 사용)
 */
export const postData = async <T, D = Record<string, unknown>>(
  url: string,
  data?: D,
  retryCount = 0
): Promise<T> => {
  // 최대 재시도 횟수
  const MAX_RETRIES = 1;

  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined,
  });

  // 토큰 관련 에러 처리
  if (response.status === 403 && retryCount < MAX_RETRIES) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도 (재시도 횟수 증가)
    return postData<T, D>(url, data, retryCount + 1);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createApiError(
      errorData.message || '요청 처리 중 오류가 발생했습니다',
      response.status,
      errorData
    );
  }

  return response.json();
};

/**
 * PUT 요청 전송을 위한 함수
 * @param url API 엔드포인트 URL
 * @param data 요청 본문 데이터
 * @param retryCount 재시도 횟수 (내부적으로 사용)
 */
export const putData = async <T, D = Record<string, unknown>>(
  url: string,
  data?: D,
  retryCount = 0
): Promise<T> => {
  // 최대 재시도 횟수
  const MAX_RETRIES = 1;

  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined,
  });

  // 토큰 관련 에러 처리
  if (response.status === 403 && retryCount < MAX_RETRIES) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도 (재시도 횟수 증가)
    return putData<T, D>(url, data, retryCount + 1);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createApiError(
      errorData.message || '요청 처리 중 오류가 발생했습니다',
      response.status,
      errorData
    );
  }

  return response.json();
};

/**
 * DELETE 요청 전송을 위한 함수
 * @param url API 엔드포인트 URL
 * @param retryCount 재시도 횟수 (내부적으로 사용)
 */
export const deleteData = async <T>(
  url: string,
  retryCount = 0
): Promise<T> => {
  // 최대 재시도 횟수
  const MAX_RETRIES = 1;

  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 토큰 관련 에러 처리
  if (response.status === 403 && retryCount < MAX_RETRIES) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도 (재시도 횟수 증가)
    return deleteData<T>(url, retryCount + 1);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createApiError(
      errorData.message || '요청 처리 중 오류가 발생했습니다',
      response.status,
      errorData
    );
  }

  return response.json();
};

/**
 * PATCH 요청 전송을 위한 함수
 * @param url API 엔드포인트 URL
 * @param data 요청 본문 데이터
 * @param retryCount 재시도 횟수 (내부적으로 사용)
 */
export const patchData = async <T, D = Record<string, unknown>>(
  url: string,
  data?: D,
  retryCount = 0
): Promise<T> => {
  // 최대 재시도 횟수
  const MAX_RETRIES = 1;

  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined,
  });

  // 토큰 관련 에러 처리
  if (response.status === 403 && retryCount < MAX_RETRIES) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도 (재시도 횟수 증가)
    return patchData<T, D>(url, data, retryCount + 1);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw createApiError(
      errorData.message || '요청 처리 중 오류가 발생했습니다',
      response.status,
      errorData
    );
  }

  return response.json();
};
