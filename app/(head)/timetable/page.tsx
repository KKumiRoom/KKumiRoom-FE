'use client';

import Timetable from '@/components/organisms/Timetable';
import useTimetableData from '@/hooks/useTimetableData';
import useUserData from '@/hooks/useUserData';

const TimetablePage = () => {
  const { user } = useUserData();
  const { courses, timetableData, handleCourseUpdate, handleCourseDelete } =
    useTimetableData();

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>{user.school.schoolName}</h1>
        <p className='text-gray-600'>
          {user.grade} {user.classNum}
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
