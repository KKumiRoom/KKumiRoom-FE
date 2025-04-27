'use client';

import SubjectFilter from '@/components/organisms/SubjectFilter';
import SubjectList from '@/components/organisms/SubjectList';
import useSubjectApi from '@/hooks/useSubjectApi';
import useSubjectFilter from '@/hooks/useSubjectFilter';
import useSubjectSearch from '@/hooks/useSubjectSearch';
import { Subject } from '@/types/subject';
import { Course } from '@/types/timetable';
import { useCallback, useEffect, useState } from 'react';

export default function SubjectPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const { subjects: fetchedSubjects } = useSubjectApi();

  useEffect(() => {
    const loadSubjects = async () => {
      const convertedSubjects: Subject[] = fetchedSubjects.map(
        (course: Course) => ({
          name: course.courseName,
          type: course.courseType as '공통' | '선택',
          code: course.courseId.toString(),
          department: course.courseArea,
          description: course.description,
          semester: course.semester,
        })
      );
      setSubjects(convertedSubjects);
      setLoading(false);
    };
    loadSubjects();
  }, [fetchedSubjects]);

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    handleSearchSubmit,
  } = useSubjectSearch<Subject>({
    initialData: subjects,
    searchKeys: ['name', 'code'],
  });

  const {
    sortType,
    filterType,
    filteredData,
    setSortType,
    setFilterType,
    resetFilters,
  } = useSubjectFilter<Subject>({
    data: searchResults,
    filterKey: 'type',
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
        <SubjectList subjects={filteredData} isLoading={isLoading} />
      </div>
    </div>
  );
}
