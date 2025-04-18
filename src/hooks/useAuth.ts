import { ApiResponse } from '@/types/ApiResponse';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDataMutation } from './useFetch';

/**
 * 인증 관련 훅
 * 로그인, 로그아웃 등의 인증 기능 제공
 */
function useAuth() {
  const router = useRouter();
  const { create } = useDataMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 로그인 함수
   * @param auth_id 사용자 ID
   * @param password 비밀번호
   * @returns 로그인 결과
   */
  const login = async (auth_id: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await create<
        { auth_id: string; password: string },
        ApiResponse
      >('/api/auth/sign-in', { auth_id, password });

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

  return { login, isLoading, error };
}

export default useAuth;
