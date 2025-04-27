'use client';

import { TimetableSubject } from '@/types/timetable';

interface SubjectDetailsProps {
  subject: TimetableSubject;
}

const SubjectDetails = ({ subject }: SubjectDetailsProps) => {
  return (
    <div className='space-y-4'>
      <h3 className='font-bold mb-1'>과목 정보</h3>
      <div className='flex gap-1'>
        <div className='flex gap-4 justify-around w-full px-2'>
          <div className='flex flex-col items-center gap-1 bg-grey/20 rounded-lg w-full p-2'>
            <p className='text-xs'>개설 학기</p>
            <p className='text-xs'>{subject.semester}</p>
          </div>
          <div className='flex flex-col items-center gap-1 bg-grey/20 rounded-lg w-full p-2'>
            <p className='text-xs'>학과</p>
            <p className='text-xs'>
              {subject.department && subject.department}
            </p>
          </div>
          <div className='flex flex-col items-center gap-1 bg-grey/20 rounded-lg w-full p-2'>
            <p className='text-xs'>분류</p>
            <p className='text-xs'>{subject.type}</p>
          </div>
        </div>
      </div>

      {subject.description && (
        <div>
          <h3 className='font-bold mb-1'>수업 내용</h3>
          <div className='text-sm border border-grey rounded-lg p-2 min-h-20'>
            {subject.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
