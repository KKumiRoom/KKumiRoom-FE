'use client';

import Timetable from '@/components/organisms/Timetable';
import useTimetableData from '@/hooks/useTimetableData';

const schoolInfo = {
  name: '대인고등학교',
  grade: '3학년',
  class: '8반',
};

const TimetablePage = () => {
  const {
    courses,
    timetableData,
    loading,
    handleCourseUpdate,
    handleCourseDelete,
  } = useTimetableData('7010117');

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>{schoolInfo.name}</h1>
        <p className='text-gray-600'>
          {schoolInfo.grade} {schoolInfo.class}
        </p>
      </div>
      <Timetable
        data={timetableData}
        courses={courses}
        onCourseUpdate={handleCourseUpdate}
        onCourseDelete={handleCourseDelete}
      />
    </div>
  );
};

export default TimetablePage;
