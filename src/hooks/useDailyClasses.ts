import { TTimeTableResponse, DAY_CODE_MAP, BadgeVariant } from '@/types';
import { ApiResponse } from '@/types/ApiResponse';
import { useRef, useState, useEffect } from 'react';
import getCurrentPeriod from '@/lib/utils/getCurrentPeriod';
import { useData } from './useFetch';

/**
 * 오늘의 수업 정보를 가져오고 관리하는 커스텀 훅
 *
 * @returns 오늘의 수업 목록, 현재 교시, 스크롤 ref 및 관련 함수
 */
export default function useDailyClasses() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPeriod, setCurrentPeriod] = useState<number>(-1);

  // 현재 요일 코드
  const todayDayCode = DAY_CODE_MAP[new Date().getDay()];

  // 시간표 데이터 가져오기
  const { data: timeTableData, isLoading } = useData<
    ApiResponse<TTimeTableResponse[]>
  >('/api/openapi/timeTable');

  // 오늘 요일에 해당하는 수업만 필터링
  const todayClasses = timeTableData?.data
    ? timeTableData.data
        .filter((item) => item.day === todayDayCode)
        .sort((a, b) => a.period - b.period)
    : [];

  // 현재 교시로 스크롤하는 함수
  const scrollToCurrentPeriod = () => {
    const period = getCurrentPeriod();
    setCurrentPeriod(period);

    if (period !== -1 && scrollContainerRef.current) {
      const currentCourseIndex = todayClasses.findIndex(
        (course) => course.period === period
      );

      if (currentCourseIndex !== -1) {
        const scrollContainer = scrollContainerRef.current;
        const containerWidth = scrollContainer.clientWidth;
        const courseElements = scrollContainer.children;

        if (courseElements.length > currentCourseIndex) {
          const currentElement = courseElements[
            currentCourseIndex
          ] as HTMLElement;

          const elementLeft = currentElement.offsetLeft;
          const elementWidth = currentElement.offsetWidth;

          const scrollPosition =
            elementLeft - containerWidth / 2 + elementWidth / 2;

          scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  // 교시 상태에 따른 Badge variant 결정 함수
  const getBadgeVariant = (period: number): BadgeVariant => {
    if (period === currentPeriod) return 'selected';
    if (period < currentPeriod) return 'previous';
    return 'next';
  };

  // 초기 로딩 및 주기적인 업데이트
  useEffect(() => {
    scrollToCurrentPeriod();
  }, []);

  return {
    todayClasses,
    currentPeriod,
    scrollContainerRef,
    getBadgeVariant,
    isLoading,
  };
}
