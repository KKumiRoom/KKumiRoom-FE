import useSWR, { useSWRConfig } from 'swr';
import {
  fetcher,
  postData,
  putData,
  deleteData,
  patchData,
} from '../lib/utils/api';

// 캐시 데이터 타입 정의
interface CacheEntry<T> {
  data?: T;
  error?: Error;
}

/**
 * 데이터 요청 훅 - SWR을 간편하게 사용할 수 있도록 래핑
 * @param url API URL (캐시 키로 사용됨)
 */
export function useData<T = unknown>(url: string | null) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<T>(
    url,
    fetcher
  );

  return {
    data,
    isLoading,
    isValidating,
    mutate,
    isError: !!error,
    error,
  };
}

/**
 * 데이터 변경을 위한 훅
 * SWR의 mutate를 활용한 효율적인 캐시 관리
 */
export function useDataMutation() {
  const { mutate, cache } = useSWRConfig();

  /**
   * 데이터 생성 (POST)
   * @param url API URL
   * @param data 요청 데이터
   */
  const create = async <TData = Record<string, unknown>, TResponse = unknown>(
    url: string,
    data: TData
  ) => {
    const response = await postData<TResponse, TData>(url, data);
    // URL 기반으로 캐시 갱신
    mutate(url);
    return response;
  };

  /**
   * 데이터 수정 (PUT)
   * @param url API URL
   * @param data 요청 데이터
   */
  const update = async <TData = Record<string, unknown>, TResponse = unknown>(
    url: string,
    data: TData
  ) => {
    const response = await putData<TResponse, TData>(url, data);
    // URL 기반으로 캐시 갱신
    mutate(url);
    return response;
  };

  /**
   * 데이터 일부 수정 (PATCH)
   * @param url API URL
   * @param data 요청 데이터
   */
  const patch = async <TData = Record<string, unknown>, TResponse = unknown>(
    url: string,
    data: TData
  ) => {
    const response = await patchData<TResponse, TData>(url, data);
    // URL 기반으로 캐시 갱신
    mutate(url);
    return response;
  };

  /**
   * 데이터 삭제 (DELETE)
   * @param url API URL
   */
  const remove = async <TResponse = unknown>(url: string) => {
    const response = await deleteData<TResponse>(url);
    // URL 기반으로 캐시 갱신
    mutate(url);
    return response;
  };

  /**
   * 낙관적 업데이트 수행 (UI 먼저 업데이트 후 서버 요청)
   * @param url API URL (캐시 키로 사용됨)
   * @param updateFn 현재 데이터를 업데이트할 함수
   * @param dataFetcher 실제 API 요청을 수행할 함수
   */
  const optimisticUpdate = async <TData = unknown, TResponse = unknown>(
    url: string,
    updateFn: (currentData: TData | undefined) => TData,
    dataFetcher: () => Promise<TResponse>
  ) => {
    // 현재 캐시된 데이터 가져오기
    const cacheEntry = cache.get(url) as CacheEntry<TData> | undefined;
    const currentData = cacheEntry?.data;

    // 낙관적 업데이트 (UI 바로 업데이트)
    mutate(url, updateFn(currentData), false);

    try {
      // 실제 API 요청 수행
      const responseData = await dataFetcher();
      // 성공 시 캐시 갱신
      mutate(url);
      return responseData;
    } catch (err) {
      // 오류 발생 시 원래 데이터로 롤백
      mutate(url, currentData, false);
      throw err;
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
