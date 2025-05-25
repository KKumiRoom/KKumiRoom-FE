'use client';

import { useCallback, useEffect, useState } from 'react';
import useDebounce from './useDebounce';

interface UseSubjectSearchProps<T> {
  initialData: T[];
  searchKeys: (keyof T)[];
  debounceTime?: number;
  isReady?: boolean;
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
  isReady = true,
}: UseSubjectSearchProps<T>): UseSubjectSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 데이터가 준비됐을 때만 초기화
  useEffect(() => {
    if (isReady) {
      setSearchResults(initialData);
    }
  }, [initialData, isReady]);

  const handleEmptyQuery = useCallback(() => {
    if (isReady) {
      setSearchResults(initialData);
      setIsLoading(false);
    }
  }, [initialData, isReady]);

  const performSearch = useCallback(
    (query: string) => {
      if (!isReady) return;
      if (!query.trim()) {
        handleEmptyQuery();
        return;
      }

      setIsLoading(true);

      try {
        const results = initialData.filter((item) =>
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
    [searchKeys, initialData, handleEmptyQuery, isReady]
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
