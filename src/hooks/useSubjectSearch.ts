'use client';

import { useCallback, useEffect, useState } from 'react';
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

  const handleEmptyQuery = useCallback(() => {
    setSearchResults(initialData);
    setIsLoading(false);
  }, [initialData]);

  const performSearch = useCallback(
    (query: string) => {
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
    [initialData, searchKeys, handleEmptyQuery]
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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(initialData);
    }
  }, [initialData, searchQuery]);

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
