'use client';

import BottomSheet from '@/components/molecules/BottomSheet';
import useSubjectApi from '@/hooks/useSubjectApi';
import { Subject } from '@/types/subject';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SubjectDetailPage = () => {
  const params = useParams();
  const subjectCode = params.subjectCode as string;
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchSubjects } = useSubjectApi();

  useEffect(() => {
    const loadSubject = async () => {
      const courses = await fetchSubjects('7010117');
      const foundCourse = courses.find(
        (c) => c.courseId.toString() === subjectCode
      );

      if (foundCourse) {
        setSubject({
          name: foundCourse.courseName,
          type: foundCourse.courseType as '공통' | '선택',
          code: foundCourse.courseId.toString(),
          department: foundCourse.courseArea,
          description: foundCourse.description,
          semester: foundCourse.semester,
        });
      }
      setLoading(false);
    };
    loadSubject();
  }, [subjectCode, fetchSubjects]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!subject) {
    return <div>과목을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div className='flex-1 flex flex-col items-center justify-center min-h-[30vh]'>
        <h1 className='text-3xl font-bold mb-2'>{subject.name}</h1>
      </div>

      <BottomSheet className='pb-20'>
        <div className='py-8'>
          <h2 className='text-2xl font-bold mb-6'>과목 정보</h2>

          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-bold'>개설 학기</h3>
              <p className='text-md'>{subject.semester}</p>
            </div>

            <div>
              <h3 className='text-lg font-bold'>학과</h3>
              <p className='text-md'>{subject.department}</p>
            </div>

            <div>
              <h3 className='text-lg font-bold'>분류</h3>
              <p className='text-md'>{`${subject.type}과목`}</p>
            </div>
          </div>

          <div className='mt-8'>
            <h3 className='text-lg font-bold mb-2'>
              우리 수업은 이렇게 배워요
            </h3>
            <p className='text-md'>{subject.description}</p>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default SubjectDetailPage;
