'use client';

import Button from '@/components/atoms/Button';
import LinkCard from '@/components/molecules/LinkCard';
import SearchForm from '@/components/molecules/SearchForm';
import SubjectInfoCard from '@/components/molecules/SubjectInfoCard';
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
        options={[
          '옵션1',
          '옵션2',
          '옵션3',
          '옵션4',
          '옵션5',
          '옵션6',
          '옵션7',
          '옵션8',
          '옵션9',
          '옵션10',
        ]}
      />
      <Button fullWidth size='lg' variant='primary'>
        버튼
      </Button>
      <LinkCard
        image='/images/cardImage/think.png'
        title='나의 진로 찾기'
        description='꾸미룸과 함께 나의 꿈을 찾아볼까 말까 고민이 되네요'
        href='/'
        className='border border-grey'
      />
      <LinkCard
        image='/images/cardImage/think.png'
        title='나의 진로 찾기'
        description='꾸미룸과 함께 나의 꿈을 찾아요'
        href='/'
        className='border border-grey'
      />
      <SubjectInfoCard title='공통수학 I' type='공통' code='1234567890' />
      <SubjectInfoCard title='지구과학 I' type='선택' code='1234567890' />
    </div>
  );
};

export default TestPage;
