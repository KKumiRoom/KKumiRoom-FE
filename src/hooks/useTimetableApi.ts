import { Course } from '@/types/timetable';
import { ErrorToast } from '@/lib/utils/notifications';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface TimetableItem {
  courseId: number;
  period: number;
  day: string;
  semester: string;
}

const useTimetableApi = () => {
  const fetchCourses = async (schoolId: string): Promise<Course[]> => {
    try {
      const response = await fetch(
        `${API_URL}/api/openapi/courses?schoolId=${schoolId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      return data.data || [];
    } catch {
      ErrorToast('수업 목록을 불러오는데 실패했습니다.');
      return [];
    }
  };

  const fetchTimetable = async (
    timetableId: number
  ): Promise<TimetableItem[]> => {
    try {
      const response = await fetch(
        `${API_URL}/api/openapi/timeTable/${timetableId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch timetable');
      }

      const data = await response.json();
      return data.data || [];
    } catch {
      ErrorToast('시간표 정보를 불러오는데 실패했습니다.');
      return [];
    }
  };

  const updateTimetable = async (
    timetableId: number,
    courseId: number,
    period: number,
    day: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/openapi/timeTable/${timetableId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId,
            period,
            day,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update timetable');
      }

      return true;
    } catch {
      ErrorToast('시간표 업데이트에 실패했습니다.');
      return false;
    }
  };

  const deleteTimetableItem = async (
    timetableId: number,
    period: number,
    day: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/openapi/timeTable/${timetableId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            period,
            day,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete timetable item');
      }

      return true;
    } catch {
      ErrorToast('시간표 삭제에 실패했습니다.');
      return false;
    }
  };

  return {
    fetchCourses,
    fetchTimetable,
    updateTimetable,
    deleteTimetableItem,
  };
};

export default useTimetableApi;
