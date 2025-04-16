'use client';

import clsx from 'clsx';

interface TimetableHeaderProps {
  days: string[];
}

const TimetableHeader = ({ days }: TimetableHeaderProps) => {
  return (
    <>
      <div className='bg-grey/10 flex items-center justify-center h-12 border-r border-b border-grey'></div>

      {days.map((day, dayIndex) => (
        <div
          key={day}
          className={clsx(
            'bg-grey/10 p-2 h-12 flex items-center justify-center text-sm font-bold border-b border-grey',
            dayIndex !== days.length - 1 && 'border-r'
          )}
        >
          {day}
        </div>
      ))}
    </>
  );
};

export default TimetableHeader;
