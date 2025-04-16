'use client';

import { TimetableData, TimetableSubject } from '@/types/timetable';
import { useState } from 'react';

interface SelectedSubject {
  subject: TimetableSubject;
  day: string;
  period: number;
}

/**
 * 시간표 관련 로직을 처리하는 훅
 */
export function useTimetable(data: TimetableData) {
  // 선택된 과목 정보
  const [selectedSubject, setSelectedSubject] =
    useState<SelectedSubject | null>(null);

  /**
   * 셀 클릭 시 처리
   */
  const selectSubject = (day: string, period: number) => {
    const subject = data[day]?.[period.toString()];
    if (subject) {
      setSelectedSubject({ subject, day, period });
    }
  };

  /**
   * 선택된 과목 정보 초기화
   */
  const clearSelectedSubject = () => {
    setSelectedSubject(null);
  };

  return {
    selectedSubject,
    selectSubject,
    clearSelectedSubject,
  };
}
