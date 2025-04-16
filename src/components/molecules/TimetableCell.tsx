'use client';

import { TimetableSubject } from '@/types/timetable';
import clsx from 'clsx';
import { KeyboardEvent } from 'react';

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
  const handleClick = () => {
    if (subject && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (subject && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // 과목이 있는 셀과 없는 셀에 대한 속성 설정
  const interactiveProps = subject
    ? {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        role: 'button',
        tabIndex: 0,
        'aria-label': `${subject.name} 과목`,
      }
    : {
        role: 'cell',
        'aria-label': '빈 셀',
      };

  return (
    <div
      className={clsx(
        'flex items-center justify-center aspect-square p-1',
        subject?.color || 'bg-cloud',
        !isLastColumn && 'border-r border-grey',
        !isLastRow && 'border-b border-grey',
        subject && 'cursor-pointer hover:opacity-80'
      )}
      {...interactiveProps}
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
