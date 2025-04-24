import { Course } from '@/types/timetable';
import { useCallback } from 'react';
import { ErrorToast } from '@/lib/utils/notifications';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const useSubjectApi = () => {
  const fetchSubjects = useCallback(
    async (schoolId: string): Promise<Course[]> => {
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
          throw new Error('Failed to fetch subjects');
        }

        const data = await response.json();
        return data.data || [];
      } catch {
        ErrorToast('과목 목록을 불러오는데 실패했습니다.');
        return [];
      }
    },
    []
  );

  return {
    fetchSubjects,
  };
};

export default useSubjectApi;
