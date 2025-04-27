import { ApiResponse } from '@/types/ApiResponse';
import { useEffect, useState } from 'react';

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

// 계열별 학과 목록을 가져오는 함수
export const fetchMajorsByArea = async (majorArea: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const response = await fetch(
    `${apiUrl}/api/major/area?majorArea=${encodeURIComponent(majorArea)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch majors');
  }

  const data: ApiResponse<MajorInfo[]> = await response.json();
  return data.data || [];
};

// 학과 상세 정보를 가져오는 훅
export const useMajorDetail = (majorId: number | null) => {
  const [loading, setLoading] = useState(false);
  const [majorDetail, setMajorDetail] = useState<MajorDetailInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMajorDetail = async () => {
      if (!majorId) {
        setMajorDetail(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/api/major/${majorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch major details');
        }

        const data: ApiResponse<MajorDetailInfo> = await response.json();
        setMajorDetail(data.data || null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '학과 정보를 불러오는데 실패했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMajorDetail();
  }, [majorId]);

  return { majorDetail, loading, error };
};
