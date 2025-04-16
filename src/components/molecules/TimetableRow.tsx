'use client';

import { TimetableData } from '@/types/timetable';
import clsx from 'clsx';
import TimetableCell from './TimetableCell';

interface TimetableRowProps {
  period: number;
  days: string[];
  data: TimetableData;
  isLastRow: boolean;
  onCellClick?: (day: string, period: number) => void;
}

const TimetableRow = ({
  period,
  days,
  data,
  isLastRow,
  onCellClick,
}: TimetableRowProps) => {
  return (
    <>
      <div
        className={clsx(
          'bg-grey/10 p-2 flex items-center justify-center text-sm font-bold border-r border-grey',
          !isLastRow && 'border-b'
        )}
      >
        {period}
      </div>

      {days.map((day, dayIndex) => {
        const subject = data[day]?.[period.toString()];
        const isLastColumn = dayIndex === days.length - 1;

        return (
          <TimetableCell
            key={`${day}-${period}`}
            subject={subject}
            isLastColumn={isLastColumn}
            isLastRow={isLastRow}
            onClick={() => onCellClick?.(day, period)}
          />
        );
      })}
    </>
  );
};

export default TimetableRow;
