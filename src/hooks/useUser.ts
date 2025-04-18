import { useEffect } from 'react';
import { useFetch } from './useFetch';

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

/**
 * 현재 로그인한 사용자 정보를 가져오는 훅
 * - 쿠키 기반 인증을 사용하므로 credentials: 'include'로 요청을 보냄
 * - 로그인 상태 확인 및 사용자 정보 획득에 사용
 */
export function useUser() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useFetch<User | null>('/api/auth/me');

  const isAuthenticated = !!user && !error;

  const refreshUser = () => {
    mutate();
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    refreshUser,
  };
}

/**
 * 인증이 필요한 페이지에서 사용하는 훅
 * 로그인되지 않은 경우 로그인 페이지로 리다이렉트
 */
export function useRequireAuth() {
  const { user, isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isLoading && !isAuthenticated) {
        const currentPath = window.location.pathname;
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    }
  }, [isLoading, isAuthenticated]);

  return { user, isLoading };
}
