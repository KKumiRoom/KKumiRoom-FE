'use client';

import FilterButton from '@/components/molecules/FilterButton';
import SearchForm from '@/components/molecules/SearchForm';
import { FilterType, SortType } from '@/hooks/useSubjectFilter';
import React from 'react';

interface SubjectFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  sortType: SortType;
  filterType: FilterType;
  onSortChange: (type: SortType) => void;
  onFilterChange: (type: FilterType) => void;
  onFilterReset: () => void;
}

const SubjectFilter = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  sortType,
  filterType,
  onSortChange,
  onFilterChange,
  onFilterReset,
}: SubjectFilterProps) => {
  return (
    <div className='top-[4.5rem] left-0 fixed z-10 w-full bg-background pb-4 after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-[-12px] after:h-[12px] after:bg-gradient-to-b after:from-background after:to-transparent after:z-[-1]'>
      <div className='w-[90%] mx-auto flex items-center justify-between gap-3'>
        <SearchForm
          value={searchQuery}
          onChange={onSearchChange}
          onSearch={onSearchSubmit}
          placeholder='과목명 또는 과목코드로 검색'
        />

        <FilterButton
          sortType={sortType}
          filterType={filterType}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          onReset={onFilterReset}
        />
      </div>
    </div>
  );
};

export default React.memo(SubjectFilter);
