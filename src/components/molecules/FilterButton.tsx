'use client';

import { FilterType, SortType } from '@/hooks/useSubjectFilter';
import { LuCheck, LuFilter } from 'react-icons/lu';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import IconButton from './IconButton';

interface FilterOption {
  label: string;
  value: string;
  group: 'sort' | 'filter';
}

interface FilterButtonProps {
  sortType: SortType;
  filterType: FilterType;
  onSortChange: (type: SortType) => void;
  onFilterChange: (type: FilterType) => void;
  onReset: () => void;
}

const FilterButton = ({
  sortType,
  filterType,
  onSortChange,
  onFilterChange,
  onReset,
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: FilterOption[] = React.useMemo(
    () => [
      { label: '정렬', value: '가나다순', group: 'sort' },
      { label: '가나다순', value: '가나다순', group: 'sort' },
      { label: '학년순', value: '학년순', group: 'sort' },
      { label: '과목 타입', value: '전체', group: 'filter' },
      { label: '전체', value: '전체', group: 'filter' },
      { label: '공통', value: '공통', group: 'filter' },
      { label: '선택', value: '선택', group: 'filter' },
    ],
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = useCallback(
    (option: FilterOption) => {
      if (option.group === 'sort') {
        onSortChange(option.value as SortType);
      } else if (option.group === 'filter') {
        onFilterChange(option.value as FilterType);
      }
    },
    [onSortChange, onFilterChange]
  );

  const toggleFilter = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    onReset();
    setIsOpen(false);
  }, [onReset]);

  return (
    <div className='relative' ref={dropdownRef}>
      <IconButton size='md' onClick={toggleFilter} aria-label='필터 열기'>
        <LuFilter />
      </IconButton>

      {isOpen && (
        <div className='absolute right-0 top-full mt-2 bg-cloud border rounded-lg shadow-lg z-20 w-48 border-grey'>
          <div className='flex flex-col py-2'>
            <div className='flex items-center justify-between px-4 pb-2 border-b border-grey'>
              <h3 className='font-bold text-sm'>필터</h3>
              <button
                className='text-xs text-primary hover:underline'
                onClick={handleReset}
              >
                초기화
              </button>
            </div>

            <div className='py-1'>
              {options.map((option) => {
                if (option.label === '정렬' || option.label === '과목 타입') {
                  return (
                    <div
                      key={`header-${option.group}-${option.label}`}
                      className='px-4 py-1 font-bold text-sm mt-2'
                    >
                      {option.label}
                    </div>
                  );
                }

                const isSelected =
                  (option.group === 'sort' && option.value === sortType) ||
                  (option.group === 'filter' && option.value === filterType);

                return (
                  <button
                    key={`option-${option.group}-${option.value}`}
                    className={`flex items-center justify-between px-4 py-2 w-full text-left text-sm ${
                      isSelected
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-grey/20'
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.label}
                    {isSelected && <LuCheck className='text-primary' />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// React.memo를 사용하여 불필요한 리렌더링 방지
export default React.memo(FilterButton);
