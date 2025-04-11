'use client';

import Button from '@/components/atoms/Button';
import SearchForm from '@/components/molecules/SearchForm';
import TitleInput from '@/components/molecules/TitleInput';
import DropdownForm from '@/components/organisms/DropdownForm';
import { useState } from 'react';

const TestPage = () => {
  const [value, setValue] = useState('');
  return (
    <div className='flex flex-col gap-4'>
      <SearchForm value={value} onChange={setValue} />
      <TitleInput
        title='제목'
        value={value}
        onChange={setValue}
        placeholder='제목을 입력하세요'
      />
      <DropdownForm
        title='드롭다운'
        value={value}
        onChange={setValue}
        options={['옵션1', '옵션2', '옵션3']}
      />
      <Button fullWidth size='lg' variant='primary'>
        버튼
      </Button>
    </div>
  );
};

export default TestPage;
