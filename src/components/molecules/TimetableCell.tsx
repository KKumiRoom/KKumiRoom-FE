'use client';

import { TimetableSubject } from '@/types/timetable';
import clsx from 'clsx';

interface TimetableCellProps {
  subject?: TimetableSubject;
  isLastColumn: boolean;
  isLastRow: boolean;
  onClick?: () => void;
}

const TimetableCell = ({
  subject,
  isLastColumn,
  isLastRow,
  onClick,
}: TimetableCellProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center aspect-square p-1',
        subject?.color || 'bg-cloud',
        !isLastColumn && 'border-r border-grey',
        !isLastRow && 'border-b border-grey',
        subject && 'cursor-pointer hover:opacity-80'
      )}
      onClick={subject ? onClick : undefined}
    >
      {subject && (
        <span className='text-xs font-medium text-center line-clamp-2 w-full break-words'>
          {subject.name}
        </span>
      )}
    </div>
  );
};

export default TimetableCell;
