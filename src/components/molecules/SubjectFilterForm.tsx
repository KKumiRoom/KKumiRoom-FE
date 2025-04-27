import { DEPARTMENT_TYPES } from '@/constants/departmentData';
import { fetchMajorsByArea, MajorInfo } from '@/hooks/useMajorData';
import { useEffect, useState } from 'react';
import { ErrorToast } from '@/lib/utils/notifications';
import DropdownForm from '../organisms/DropdownForm';

interface Option {
  id: number;
  name: string;
}

export interface SubjectFilterFormProps {
  className?: string;
  initialMajor?: string;
  onMajorSelect: (majorId: number) => void;
}

const SubjectFilterForm = ({
  className = '',
  initialMajor,
  onMajorSelect,
}: SubjectFilterFormProps) => {
  const [selectedType, setSelectedType] = useState<number>(-1);
  const [departmentOptions, setDepartmentOptions] = useState<Option[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);

  const handleTypeChange = async (id: number) => {
    setSelectedType(id);
    setSelectedDepartment(-1);

    if (id === -1) {
      setDepartmentOptions([]);
      return;
    }

    try {
      const selectedArea = DEPARTMENT_TYPES.find((type) => type.id === id);
      if (selectedArea) {
        const majors = await fetchMajorsByArea(selectedArea.name);
        const options = majors.map((major: MajorInfo) => ({
          id: major.majorId,
          name: major.name,
        }));
        setDepartmentOptions(options);

        if (initialMajor) {
          const matchingMajor = options.find(
            (opt: Option) => opt.name === initialMajor
          );
          if (matchingMajor) {
            setSelectedDepartment(matchingMajor.id);
            onMajorSelect(matchingMajor.id);
          }
        }
      }
    } catch (error) {
      ErrorToast(`에러가 발생했습니다: ${error}`);
      setDepartmentOptions([]);
    }
  };

  // 학과 선택 처리
  const handleDepartmentChange = (id: number) => {
    setSelectedDepartment(id);
    onMajorSelect(id);
  };

  // 초기 학과가 있을 경우 처리
  useEffect(() => {
    if (initialMajor && selectedType === -1) {
      const fetchInitialMajor = async () => {
        try {
          // 모든 계열의 학과 정보를 병렬로 가져옴
          const allMajorsPromises = DEPARTMENT_TYPES.map((type) =>
            fetchMajorsByArea(type.name)
              .then((majors: MajorInfo[]) => ({ type, majors }))
              .catch(() => ({ type, majors: [] as MajorInfo[] }))
          );

          const results = await Promise.all(allMajorsPromises);

          // 일치하는 학과 찾기
          const matchingResult = results.find(({ majors }) =>
            majors.some((major: MajorInfo) => major.name === initialMajor)
          );

          if (matchingResult) {
            const { type, majors } = matchingResult;
            const matchingMajor = majors.find(
              (major: MajorInfo) => major.name === initialMajor
            );

            if (matchingMajor) {
              setSelectedType(type.id);
              const options = majors.map((major: MajorInfo) => ({
                id: major.majorId,
                name: major.name,
              }));
              setDepartmentOptions(options);
              setSelectedDepartment(matchingMajor.majorId);
              onMajorSelect(matchingMajor.majorId);
            }
          }
        } catch (error) {
          ErrorToast(`에러가 발생했습니다: ${error}`);
        }
      };

      fetchInitialMajor();
    }
  }, [initialMajor, onMajorSelect, selectedType]);

  return (
    <div className={`flex justify-between gap-4 ${className}`}>
      <DropdownForm
        title=''
        placeholder='계열'
        value={selectedType}
        onChange={handleTypeChange}
        options={DEPARTMENT_TYPES}
      />
      <DropdownForm
        title=''
        placeholder='학과'
        value={selectedDepartment}
        onChange={handleDepartmentChange}
        options={departmentOptions}
        disabled={selectedType === -1}
      />
    </div>
  );
};

export default SubjectFilterForm;
