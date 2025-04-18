import useSWR, { useSWRConfig } from 'swr';
import {
  fetcher,
  postData,
  putData,
  deleteData,
  patchData,
} from '../lib/utils/api';

/**
 * 기본 데이터 가져오기 훅
 * SWR의 장점을 최대한 활용하는 간결한 구조
 */
export function useFetch<T = any>(key: string | null) {
  return useSWR<T>(key, fetcher);
}

/**
 * 데이터 요청 상태 및 결과를 포함한 확장된 훅
 */
export function useData<T = any>(key: string | null) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<T>(
    key,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    isError: !!error,
  };
}

/**
 * 데이터 변경을 위한 훅
 * SWR의 mutate를 활용한 효율적인 캐시 관리
 */
export function useDataMutation() {
  const { mutate } = useSWRConfig();

  /**
   * 데이터 생성 (POST)
   */
  const create = async <T = any, R = any>(url: string, data: T) => {
    const response = await postData<R>(url, data);
    mutate(url);
    return response;
  };

  /**
   * 데이터 수정 (PUT)
   */
  const update = async <T = any, R = any>(url: string, data: T) => {
    const response = await putData<R>(url, data);
    mutate(url);
    return response;
  };

  /**
   * 데이터 일부 수정 (PATCH)
   */
  const patch = async <T = any, R = any>(url: string, data: T) => {
    const response = await patchData<R>(url, data);
    mutate(url);
    return response;
  };

  /**
   * 데이터 삭제 (DELETE)
   */
  const remove = async <R = any>(url: string) => {
    const response = await deleteData<R>(url);
    mutate(url);
    return response;
  };

  /**
   * 낙관적 업데이트 수행 (UI 먼저 업데이트 후 서버 요청)
   */
  const optimisticUpdate = async <T = any, R = any>(
    url: string,
    updateFn: (currentData: T | undefined) => T,
    fetcher: () => Promise<R>
  ) => {
    // 현재 캐시된 데이터 가져오기
    const currentData = (cache.get(url) as any)?.data;

    try {
      // 낙관적 업데이트 (UI 바로 업데이트)
      mutate(url, updateFn(currentData), false);
      const responseData = await fetcher();
      mutate(url);
      return responseData;
    } catch (error) {
      mutate(url, currentData, false);
      throw error;
    }
  };

  return {
    create,
    update,
    patch,
    remove,
    optimisticUpdate,
    mutate,
  };
}

// SWR 캐시 객체에 접근
const cache = useSWRConfig().cache;
