import { ApiResponse } from '@/types/ApiResponse';
import { TAuth } from '@/types/data/TAuth';
import { TRegister } from '@/types/data/TRegister';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDataMutation } from './useFetch';

/**
 * 인증 관련 훅
 * 로그인, 로그아웃, 회원가입 등의 인증 기능 제공
 */
function useAuth() {
  const router = useRouter();
  const { create, remove } = useDataMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 로그인 함수
   * @param auth_id 사용자 ID
   * @param password 비밀번호
   * @returns 로그인 결과
   */
  const login = async (data: TAuth) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await create<TAuth, ApiResponse>(
        '/api/auth/sign-in',
        data
      );

      // 성공적인 응답 처리
      if (response && response.code === 200) {
        router.push('/');
        return { success: true };
      }

      // 서버에서 오류 응답을 보낸 경우 (API 오류 메시지 표시)
      // 이 경우는 HTTP 상태는 성공(200)이지만 비즈니스 로직에서 오류를 반환한 경우
      setError(response?.message || '로그인에 실패했습니다.');
      return { success: false, error: response?.message };
    } catch (err) {
      // API 요청 자체가 실패한 경우 (네트워크 오류 등)
      const errorMessage =
        err instanceof Error ? err.message : '로그인에 실패했습니다.';

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 로그아웃 함수
   * - 서버 API를 호출하여 HttpOnly 쿠키를 삭제합니다
   * - 성공하면 로그인 페이지로 리디렉션합니다
   */
  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // POST 요청으로 로그아웃 API 호출
      const response = await create<{}, ApiResponse>('/api/auth/sign-out', {});

      // 성공적인 응답 처리
      if (response && response.code === 200) {
        router.push('/login');
        return { success: true };
      }

      // 서버에서 오류 응답을 보낸 경우
      setError(response?.message || '로그아웃에 실패했습니다.');
      return { success: false, error: response?.message };
    } catch (err) {
      // API 요청 자체가 실패한 경우
      const errorMessage =
        err instanceof Error ? err.message : '로그아웃에 실패했습니다.';

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 회원가입 함수
   * @param userData 사용자 등록 정보
   * @returns 회원가입 결과
   */
  const register = async (userData: TRegister) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await create<TRegister, ApiResponse>(
        '/api/auth/sign-up',
        userData
      );

      // 성공적인 응답 처리
      if (response && response.code === 200) {
        router.push('/login');
        return { success: true };
      }

      // 서버에서 오류 응답을 보낸 경우
      setError(response?.message || '회원가입에 실패했습니다.');
      return { success: false, error: response?.message };
    } catch (err) {
      // API 요청 자체가 실패한 경우
      const errorMessage =
        err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.';

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, logout, register, isLoading, error };
}

export default useAuth;
