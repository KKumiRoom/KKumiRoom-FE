'use client';

import { Course, DAY_MAPPING, TimetableData } from '@/types/timetable';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import CourseSelectModal from '../molecules/CourseSelectModal';
import TimetableHeader from '../molecules/TimetableHeader';
import TimetableRow from '../molecules/TimetableRow';
import SubjectModal from './SubjectModal';

interface TimetableProps {
  data: TimetableData;
  courses: Course[];
  days?: string[];
  periods?: number;
  className?: string;
  onCourseUpdate: (
    courseId: number,
    period: number,
    day: string
  ) => Promise<void>;
  onCourseDelete: (period: number, day: string) => Promise<void>;
}

const Timetable = ({
  data,
  courses,
  days = ['월', '화', '수', '목', '금'],
  periods = 8,
  className,
  onCourseUpdate,
  onCourseDelete,
}: TimetableProps): ReactNode => {
  const [selectedCell, setSelectedCell] = useState<{
    day: string;
    period: number;
    isEdit?: boolean;
  } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<{
    day: string;
    period: number;
    subject: TimetableData[string][string];
  } | null>(null);

  const periodsArray = Array.from({ length: periods }, (_, i) => i + 1);

  const handleCellClick = (day: string, period: number) => {
    const subject = data[day]?.[period.toString()];
    if (subject) {
      setSelectedSubject({ day, period, subject });
    } else {
      setSelectedCell({ day, period });
    }
  };

  const handleCourseSelect = async (courseId: number) => {
    if (!selectedCell) return;

    await onCourseUpdate(
      courseId,
      selectedCell.period,
      DAY_MAPPING[selectedCell.day as keyof typeof DAY_MAPPING]
    );
    setSelectedCell(null);
  };

  const handleCourseEdit = (day: string, period: number) => {
    setSelectedCell({ day, period, isEdit: true });
    setSelectedSubject(null);
  };

  const handleCourseDelete = async (day: string, period: number) => {
    await onCourseDelete(period, DAY_MAPPING[day as keyof typeof DAY_MAPPING]);
    setSelectedSubject(null);
  };

  const handleCloseSubject = () => {
    setSelectedSubject(null);
  };

  return (
    <>
      <div
        className={clsx(
          'w-full overflow-hidden rounded-lg border border-grey',
          className
        )}
      >
        <div
          className='grid w-full'
          style={{ gridTemplateColumns: `3rem repeat(${days.length}, 1fr)` }}
        >
          <TimetableHeader days={days} />

          {periodsArray.map((period, periodIndex) => (
            <TimetableRow
              key={`row-${period}`}
              period={period}
              days={days}
              data={data}
              isLastRow={periodIndex === periods - 1}
              onCellClick={handleCellClick}
            />
          ))}
        </div>
      </div>

      {selectedCell && (
        <CourseSelectModal
          courses={courses}
          isOpen
          onSelect={handleCourseSelect}
          onClose={() => setSelectedCell(null)}
        />
      )}

      {selectedSubject && (
        <SubjectModal
          subject={selectedSubject.subject}
          isOpen
          onClose={handleCloseSubject}
          onDelete={() =>
            handleCourseDelete(selectedSubject.day, selectedSubject.period)
          }
          onEdit={() =>
            handleCourseEdit(selectedSubject.day, selectedSubject.period)
          }
        />
      )}
    </>
  );
};

export default Timetable;
