'use client';

import { IoMdSearch } from 'react-icons/io';
import React, { useCallback } from 'react';
import Input from '../atoms/Input';
import IconButton from './IconButton';

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchForm = ({
  value,
  onChange,
  onSearch,
  placeholder = '검색어를 입력하세요',
  className = '',
}: SearchFormProps) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && onSearch) {
        e.preventDefault();
        onSearch();
      }
    },
    [onSearch]
  );

  const handleSearch = useCallback(() => {
    if (onSearch) {
      onSearch();
    }
  }, [onSearch]);

  const handleChange = useCallback(
    (newValue: string) => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <div
      role='search'
      aria-label='검색'
      className={`flex items-center justify-between w-full bg-cloud rounded-xl px-2 py-1.5 border border-gray-200 ${className}`}
    >
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className='text-sm'
        onKeyDown={handleKeyDown}
        aria-label={placeholder}
      />
      <IconButton
        size='md'
        className='ml-2'
        onClick={handleSearch}
        aria-label='검색하기'
      >
        <IoMdSearch />
      </IconButton>
    </div>
  );
};

export default React.memo(SearchForm);
