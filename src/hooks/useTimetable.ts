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
 *
 * @param data 시간표 데이터
 * @returns 선택된 과목 상태와 관련 함수들
 */
function useTimetable(data: TimetableData) {
  // 선택된 과목 정보 상태
  const [selectedSubject, setSelectedSubject] =
    useState<SelectedSubject | null>(null);

  /**
   * 시간표 셀 클릭 시 해당 과목 선택
   *
   * @param day 요일
   * @param period 교시
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

export default useTimetable;
