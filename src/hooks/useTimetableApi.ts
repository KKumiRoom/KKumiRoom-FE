import { ApiResponse } from '@/types/ApiResponse';
import { Course } from '@/types/timetable';
import { useData, useDataMutation } from './useFetch';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// API에서 반환되는 시간표 항목 타입
interface TimetableItem {
  courseId: number;
  courseName: string;
  period: number;
  day: string;
}

// SWR 기반 시간표 API 훅
const useTimetableApi = () => {
  const { data: coursesResponse, isLoading: isCoursesLoading } = useData<
    ApiResponse<Course[]>
  >(`${API_URL}/api/courses`);

  const {
    data: timetableResponse,
    isLoading: isTimetableLoading,
    mutate: mutateTimetable,
  } = useData<ApiResponse<TimetableItem[]>>(`${API_URL}/api/timeTable`);

  const { create } = useDataMutation();

  // 시간표 업데이트
  const updateTimetable = async (
    courseId: number,
    period: number,
    day: string
  ): Promise<void> => {
    await create(`${API_URL}/api/timeTable`, {
      courseId,
      period,
      day,
    });

    // 시간표 데이터 갱신
    mutateTimetable();
  };

  // 시간표 항목 삭제
  const deleteTimetableItem = async (
    period: number,
    day: string
  ): Promise<void> => {
    await create(`${API_URL}/api/timeTable/delete`, {
      period,
      day,
    });

    // 시간표 데이터 갱신
    mutateTimetable();
  };

  return {
    courses: coursesResponse?.data || [],
    timetableItems: timetableResponse?.data || [],
    isCoursesLoading,
    isTimetableLoading,
    isLoading: isCoursesLoading || isTimetableLoading,
    updateTimetable,
    deleteTimetableItem,
    mutateTimetable,
  };
};

export default useTimetableApi;
