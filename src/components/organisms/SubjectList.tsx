'use client';

import SubjectInfoCard from '@/components/molecules/SubjectInfoCard';
import { Subject } from '@/types/subject';
import React from 'react';

interface SubjectListProps {
  subjects: Subject[];
  isLoading?: boolean;
}

/**
 * 과목 목록 표시 전용 컴포넌트
 * 과목 데이터를 카드 형태로 렌더링하는 책임만 담당
 */
const SubjectList = ({ subjects, isLoading }: SubjectListProps) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <p className='text-gray-500'>검색 중...</p>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className='flex justify-center items-center py-8'>
        <p className='text-gray-500'>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {subjects.map((subject) => (
        <SubjectInfoCard
          key={subject.code}
          title={subject.name}
          type={subject.type}
          code={subject.code}
        />
      ))}
    </div>
  );
};

export default React.memo(SubjectList);
