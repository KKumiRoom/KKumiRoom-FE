import { EDUCATION_OFFICES } from '@/constants/schoolData';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

// 학교 데이터를 저장할 atom
export const schoolsDataAtom = atom<Record<string, string[]>>({});

export function useSchoolData() {
  const [schoolsData, setSchoolsData] = useAtom(schoolsDataAtom);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/schools', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();

          if (result.data) {
            // API 응답에서 학교 데이터를 지역별로 구조화
            const schoolsByRegion: Record<string, string[]> = {};

            result.data.forEach(
              (school: { schoolName: string; eduId: number }) => {
                // eduId를 기반으로 지역 찾기
                const educationOffice = EDUCATION_OFFICES.find(
                  (office) => office.code === `${school.eduId}`
                );
                const region = educationOffice?.region || '기타';

                if (!schoolsByRegion[region]) {
                  schoolsByRegion[region] = [];
                }

                schoolsByRegion[region].push(school.schoolName);
              }
            );

            setSchoolsData(schoolsByRegion);
          }
        }
      } catch (error) {
        console.error('학교 정보 로드 중 오류 발생:', error);
      }
    };

    // 이미 데이터가 있으면 다시 불러오지 않음
    if (Object.keys(schoolsData).length === 0) {
      fetchSchools();
    }
  }, [setSchoolsData, schoolsData]);

  return { schoolsData };
}

export default useSchoolData;
