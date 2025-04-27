import { ApiResponse } from '@/types/ApiResponse';
import { Course } from '@/types/timetable';
import { useData } from './useFetch';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const useSubjectApi = () => {
  const { data, isLoading, isError, mutate } = useData<ApiResponse<Course[]>>(
    `${API_URL}/api/courses`
  );

  return {
    subjects: data?.data || [],
    isLoading,
    isError,
    mutate,
  };
};

export default useSubjectApi;
