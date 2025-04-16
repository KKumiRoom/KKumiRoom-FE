'use client';

import useTimetable from '@/hooks/useTimetable';
import { TimetableData } from '@/types/timetable';
import clsx from 'clsx';
import { ReactNode } from 'react';
import TimetableHeader from '../molecules/TimetableHeader';
import TimetableRow from '../molecules/TimetableRow';
import SubjectModal from './SubjectModal';

interface TimetableProps {
  data: TimetableData;
  days?: string[];
  periods?: number;
  className?: string;
  onDeleteSubject?: (day: string, period: number) => void;
}

const Timetable = ({
  data,
  days = ['월', '화', '수', '목', '금'],
  periods = 8,
  className,
  onDeleteSubject,
}: TimetableProps): ReactNode => {
  const { selectedSubject, selectSubject, clearSelectedSubject } =
    useTimetable(data);

  const periodsArray = Array.from({ length: periods }, (_, i) => i + 1);

  const handleDelete = () => {
    if (selectedSubject && onDeleteSubject) {
      onDeleteSubject(selectedSubject.day, selectedSubject.period);
    }
    clearSelectedSubject();
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
              onCellClick={selectSubject}
            />
          ))}
        </div>
      </div>

      {selectedSubject && (
        <SubjectModal
          subject={selectedSubject.subject}
          day={selectedSubject.day}
          period={selectedSubject.period}
          isOpen
          onClose={clearSelectedSubject}
          onDelete={onDeleteSubject ? handleDelete : undefined}
        />
      )}
    </>
  );
};

export default Timetable;
