const isServer = () => typeof window === 'undefined';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * 쿠키에서 특정 이름의 값을 가져오는 함수
 */
export const getCookie = (name: string): string | null => {
  if (isServer()) return null;

  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

/**
 * 쿠키에 값을 설정하는 함수
 */
export const setCookie = (name: string, value: string, days = 7): void => {
  if (isServer()) return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
};

/**
 * 쿠키에서 값을 삭제하는 함수
 */
export const removeCookie = (name: string): void => {
  if (isServer()) return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
};

/**
 * 토큰을 쿠키에서 가져오는 함수
 */
export const getToken = (): string | null => {
  return getCookie('accessToken');
};

/**
 * 토큰을 쿠키에 저장하는 함수
 */
export const setToken = (token: string): void => {
  setCookie('accessToken', token);
};

/**
 * 토큰을 쿠키에서 제거하는 함수
 */
export const removeToken = (): void => {
  removeCookie('accessToken');
};

/**
 * 액세스 토큰 갱신 함수
 */
export const refreshAccessToken = async (): Promise<null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    if (!isServer()) {
      window.location.href = '/login';
    }
    return null;
  }
};

/**
 * SWR에서 사용할 기본 fetcher 함수
 * API 응답 형식에 맞게 에러 처리 및 데이터 파싱
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    credentials: 'include', // 쿠키 포함 (자동으로 액세스 토큰 전송)
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 토큰 관련 에러 처리
  if (response.status === 403) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도
    return fetcher<T>(url);
  } else if (response.status === 401) {
    console.error('인증이 필요합니다');
    if (!isServer()) {
      window.location.href = '/login';
    }
    throw new Error('인증이 필요합니다');
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || '요청 처리 중 오류가 발생했습니다'
    );
    (error as any).status = response.status;
    (error as any).info = errorData;
    throw error;
  }

  return response.json();
};

/**
 * POST 요청 전송을 위한 함수
 */
export const postData = async <T>(url: string, data?: any): Promise<T> => {
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
  if (response.status === 403) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도
    return postData<T>(url, data);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || '요청 처리 중 오류가 발생했습니다'
    );
    (error as any).status = response.status;
    (error as any).info = errorData;
    throw error;
  }

  return response.json();
};

/**
 * PUT 요청 전송을 위한 함수
 */
export const putData = async <T>(url: string, data?: any): Promise<T> => {
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
  if (response.status === 403) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도
    return putData<T>(url, data);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || '요청 처리 중 오류가 발생했습니다'
    );
    (error as any).status = response.status;
    (error as any).info = errorData;
    throw error;
  }

  return response.json();
};

/**
 * DELETE 요청 전송을 위한 함수
 */
export const deleteData = async <T>(url: string): Promise<T> => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 토큰 관련 에러 처리
  if (response.status === 403) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도
    return deleteData<T>(url);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || '요청 처리 중 오류가 발생했습니다'
    );
    (error as any).status = response.status;
    (error as any).info = errorData;
    throw error;
  }

  return response.json();
};

/**
 * PATCH 요청 전송을 위한 함수
 */
export const patchData = async <T>(url: string, data?: any): Promise<T> => {
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
  if (response.status === 403) {
    await refreshAccessToken();
    // 토큰 갱신 후 재시도
    return patchData<T>(url, data);
  }

  // 일반 에러 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || '요청 처리 중 오류가 발생했습니다'
    );
    (error as any).status = response.status;
    (error as any).info = errorData;
    throw error;
  }

  return response.json();
};
