'use client';

import { useState, useCallback, useMemo } from 'react';

export type SortType = '가나다순' | '학년순';
export type FilterType = '전체' | '공통' | '선택';

interface NameField {
  name: string;
}

interface UseSubjectFilterProps<T> {
  data: T[];
  filterKey: keyof T;
}

interface UseSubjectFilterReturn<T> {
  sortType: SortType;
  filterType: FilterType;
  filteredData: T[];
  setSortType: (type: SortType) => void;
  setFilterType: (type: FilterType) => void;
  resetFilters: () => void;
}

function useSubjectFilter<T extends NameField>({
  data,
  filterKey,
}: UseSubjectFilterProps<T>): UseSubjectFilterReturn<T> {
  const [sortType, setSortType] = useState<SortType>('가나다순');
  const [filterType, setFilterType] = useState<FilterType>('전체');

  const filteredData = useMemo(() => {
    let result = [...data];

    if (filterType !== '전체') {
      result = result.filter((item) => String(item[filterKey]) === filterType);
    }

    if (sortType === '가나다순') {
      result.sort((a, b) => {
        return String(a.name).localeCompare(String(b.name));
      });
    } else if (sortType === '학년순') {
      result.sort((a, b) => {
        const gradeA = String(a.name).match(/\d+/)?.[0] || '0';
        const gradeB = String(b.name).match(/\d+/)?.[0] || '0';
        return Number(gradeB) - Number(gradeA);
      });
    }

    return result;
  }, [data, filterType, filterKey, sortType]);

  const resetFilters = useCallback(() => {
    setSortType('가나다순');
    setFilterType('전체');
  }, []);

  return {
    sortType,
    filterType,
    filteredData,
    setSortType,
    setFilterType,
    resetFilters,
  };
}

export default useSubjectFilter;
