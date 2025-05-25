'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import useDebounce from './useDebounce';

interface UseSubjectSearchProps<T> {
  initialData: T[];
  searchKeys: (keyof T)[];
  debounceTime?: number;
}

interface UseSubjectSearchReturn<T> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: T[];
  isLoading: boolean;
  handleSearchSubmit: () => void;
  resetSearch: () => void;
}

function useSubjectSearch<T>({
  initialData,
  searchKeys,
  debounceTime = 300,
}: UseSubjectSearchProps<T>): UseSubjectSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 데이터에 대한 참조를 저장하여 불필요한 리렌더링 방지
  const initialDataRef = useRef(initialData);

  // 초기 데이터가 변경되면 참조를 업데이트
  useEffect(() => {
    initialDataRef.current = initialData;
    // 검색어가 비어있을 때만 결과 업데이트
    if (!searchQuery.trim()) {
      setSearchResults(initialData);
    }
  }, [initialData, searchQuery, setSearchResults]);

  const handleEmptyQuery = useCallback(() => {
    setSearchResults(initialDataRef.current);
    setIsLoading(false);
  }, []); // 의존성 배열에서 initialData 제거

  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        handleEmptyQuery();
        return;
      }

      setIsLoading(true);

      try {
        const results = initialDataRef.current.filter((item) =>
          searchKeys.some((key) => {
            const value = item[key];
            return (
              value !== undefined &&
              (typeof value === 'string' || typeof value === 'number') &&
              String(value).toLowerCase().includes(query.toLowerCase())
            );
          })
        );

        setSearchResults(results);
      } finally {
        setIsLoading(false);
      }
    },
    [searchKeys, handleEmptyQuery]
  );

  const { debounce, executeNow, cancelDebounce } = useDebounce(
    performSearch,
    debounceTime
  );

  const resetToInitialData = useCallback(() => {
    handleEmptyQuery();
    cancelDebounce();
  }, [handleEmptyQuery, cancelDebounce]);

  const handleSetSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);

      if (!query.trim()) {
        handleEmptyQuery();
        cancelDebounce();
      }
    },
    [handleEmptyQuery, cancelDebounce]
  );

  const handleSearchSubmit = useCallback(() => {
    executeNow(searchQuery);
  }, [executeNow, searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      handleEmptyQuery();
      return;
    }

    debounce(searchQuery);
  }, [searchQuery, debounce, handleEmptyQuery]);

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    searchResults,
    isLoading,
    handleSearchSubmit,
    resetSearch: resetToInitialData,
  };
}

export default useSubjectSearch;
