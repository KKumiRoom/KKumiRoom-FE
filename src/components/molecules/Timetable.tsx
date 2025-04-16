'use client';

import clsx from 'clsx';
import React, { Fragment, ReactNode } from 'react';

export interface TimetableSubject {
  name: string;
  color: string;
}

export interface TimetableData {
  [day: string]: {
    [period: string]: TimetableSubject;
  };
}

interface TimetableProps {
  /**
   * 시간표 데이터
   */
  data: TimetableData;

  /**
   * 요일 배열 (기본값: ['월', '화', '수', '목', '금'])
   */
  days?: string[];

  /**
   * 교시 수 (기본값: 8)
   */
  periods?: number;

  /**
   * 추가 스타일링
   */
  className?: string;

  /**
   * 셀 클릭 이벤트 핸들러
   */
  onCellClick?: (day: string, period: number) => void;
}

/**
 * 시간표 컴포넌트
 */
const Timetable = ({
  data,
  days = ['월', '화', '수', '목', '금'],
  periods = 8,
  onCellClick,
  className,
}: TimetableProps): ReactNode => {
  const periodsArray = Array.from({ length: periods }, (_, i) => i + 1);

  return (
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
        {/* 헤더 행 */}
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

        {/* 데이터 행 */}
        {periodsArray.map((period, periodIndex) => (
          <Fragment key={`row-${period}`}>
            <div
              className={clsx(
                'bg-grey/10 p-2 flex items-center justify-center text-sm font-bold border-r border-grey',
                periodIndex !== periods - 1 && 'border-b'
              )}
            >
              {period}
            </div>

            {days.map((day, dayIndex) => {
              const subject = data[day]?.[period.toString()];
              const isLastColumn = dayIndex === days.length - 1;
              const isLastRow = periodIndex === periods - 1;

              return (
                <div
                  key={`${day}-${period}`}
                  className={clsx(
                    'flex items-center justify-center aspect-square p-1',
                    subject?.color || 'bg-cloud',
                    !isLastColumn && 'border-r border-grey',
                    !isLastRow && 'border-b border-grey',
                    onCellClick && 'cursor-pointer hover:opacity-80'
                  )}
                  onClick={() => onCellClick && onCellClick(day, period)}
                >
                  {subject && (
                    <span className='text-xs font-medium text-center line-clamp-2 w-full break-words'>
                      {subject.name}
                    </span>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
