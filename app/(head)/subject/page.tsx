'use client';

import SubjectFilter from '@/components/organisms/SubjectFilter';
import SubjectList from '@/components/organisms/SubjectList';
import useSubjectApi from '@/hooks/useSubjectApi';
import useSubjectFilter from '@/hooks/useSubjectFilter';
import useSubjectSearch from '@/hooks/useSubjectSearch';
import { Course } from '@/types/timetable';
import { useCallback, useEffect, useState } from 'react';

export default function SubjectPage() {
  const [loading, setLoading] = useState(true);
  const { subjects: courses, isLoading } = useSubjectApi();

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading: isSearching,
    handleSearchSubmit,
  } = useSubjectSearch<Course>({
    initialData: courses,
    searchKeys: ['courseName', 'courseId'],
    isReady: !isLoading,
  });

  const {
    sortType,
    filterType,
    filteredData,
    setSortType,
    setFilterType,
    resetFilters,
  } = useSubjectFilter<Course>({
    data: searchResults,
    filterKey: 'courseType',
  });

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [setSearchQuery]
  );

  // 필터 변경 핸들러 메모이제이션
  const handleSortChange = useCallback(
    (type: typeof sortType) => {
      setSortType(type);
    },
    [setSortType]
  );

  const handleFilterChange = useCallback(
    (type: typeof filterType) => {
      setFilterType(type);
    },
    [setFilterType]
  );

  // 모든 필터 리셋
  const handleResetAll = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <SubjectFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        sortType={sortType}
        filterType={filterType}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onFilterReset={handleResetAll}
      />

      <div className='mt-12 pt-4'>
        <SubjectList courses={filteredData} isLoading={isSearching} />
      </div>
    </div>
  );
}
