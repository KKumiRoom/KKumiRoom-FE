import { ApiResponse } from '@/types/ApiResponse';
import { fetcher } from '@/lib/utils/api';
import { useData } from './useFetch';

export interface MajorInfo {
  majorId: number;
  name: string;
}

export interface MajorDetailInfo {
  majorId: number;
  majorName: string;
  description: string;
  relatedMajors: string;
  recommendedCourses: string;
  recommendedStudents: string;
  careerPath: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * 학과 영역별 목록을 가져오는 함수 (Promise 기반)
 */
export const fetchMajorsByArea = async (
  majorArea: string
): Promise<MajorInfo[]> => {
  try {
    const url = `${API_URL}/api/major/area?majorArea=${encodeURIComponent(majorArea)}`;
    const response = await fetcher<ApiResponse<MajorInfo[]>>(url);
    return response.data || [];
  } catch (error) {
    console.error('학과 정보 조회 에러:', error);
    return [];
  }
};

export const useMajorsByArea = (majorArea: string | null) => {
  const url = majorArea
    ? `${API_URL}/api/major/area?majorArea=${encodeURIComponent(majorArea)}`
    : null;

  const { data, isLoading, isError } = useData<ApiResponse<MajorInfo[]>>(url);

  return {
    majors: data?.data || [],
    isLoading,
    isError,
  };
};

/**
 * 학과 상세 정보를 가져오는 SWR 기반 훅
 */
export const useMajorDetail = (majorId: number | null) => {
  const url = majorId ? `${API_URL}/api/major/${majorId}` : null;

  const { data, isLoading, isError, error } =
    useData<ApiResponse<MajorDetailInfo>>(url);

  return {
    majorDetail: data?.data || null,
    loading: isLoading,
    error: isError
      ? error?.message || '학과 정보를 불러오는데 실패했습니다.'
      : null,
  };
};
