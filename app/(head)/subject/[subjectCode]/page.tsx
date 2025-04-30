'use client';

import BottomSheet from '@/components/molecules/BottomSheet';
import CourseDetail from '@/components/molecules/CourseDetail';
import useSubjectApi from '@/hooks/useSubjectApi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SubjectDetailPage = () => {
  const params = useParams();
  const subjectCode = params.subjectCode as string;
  const [loading, setLoading] = useState(true);
  const { subjects } = useSubjectApi();

  // 과목 정보 찾기
  const subject = subjects.find((c) => c.courseId.toString() === subjectCode);

  useEffect(() => {
    if (subjects && subjects.length > 0) {
      setLoading(false);
    }
  }, [subjects]);

  if (!subject || loading) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center mt-20'>
        <div className='w-10 h-10 border-t-2 border-b-2 border-grey rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <>
      <div className='flex-1 flex flex-col items-center justify-center mt-20'>
        <h1 className='text-3xl font-bold mb-2'>{subject.courseName}</h1>
      </div>

      <BottomSheet className='pb-40 max-h-[75vh]'>
        <div className='py-12'>
          <div>
            <h1 className='text-2xl font-bold mb-8'>과목정보</h1>
            <CourseDetail course={subject} />
          </div>

          <div className='mt-16'>
            <h3 className='text-lg font-semibold pb-3 border-b border-grey/50'>
              우리 수업은 이런걸 배워요
            </h3>
            <p className='text-md mt-5'>{subject.description}</p>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default SubjectDetailPage;
