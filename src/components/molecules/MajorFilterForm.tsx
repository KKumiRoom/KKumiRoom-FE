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
  initialMajorId?: number;
  onMajorSelect: (majorId: number) => void;
}

const MajorFilterForm = ({
  className = '',
  initialMajor,
  initialMajorId,
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

        // 초기 학과 ID가 있는 경우 선택
        if (initialMajorId && initialMajorId > 0) {
          const matchingMajor = options.find(
            (opt: Option) => opt.id === initialMajorId
          );
          if (matchingMajor) {
            setSelectedDepartment(matchingMajor.id);
            onMajorSelect(matchingMajor.id);
            return;
          }
        }

        // 초기 학과명이 있는 경우 선택
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ErrorToast(`학과 정보를 불러오는데 실패했습니다`);
      setDepartmentOptions([]);
    }
  };

  // 학과 선택 처리
  const handleDepartmentChange = (id: number) => {
    setSelectedDepartment(id);
    onMajorSelect(id);
  };

  useEffect(() => {
    const fetchAndSelectMajor = async (
      matcher: (major: MajorInfo) => boolean
    ) => {
      try {
        const allMajorsPromises = DEPARTMENT_TYPES.map((type) =>
          fetchMajorsByArea(type.name)
            .then((majors: MajorInfo[]) => ({ type, majors }))
            .catch(() => ({ type, majors: [] as MajorInfo[] }))
        );

        const results = await Promise.all(allMajorsPromises);

        const matchingResult = results.find(({ majors }) =>
          majors.some(matcher)
        );

        if (matchingResult) {
          const { type, majors } = matchingResult;
          const matchingMajor = majors.find(matcher);

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        ErrorToast(`학과 정보를 불러오는데 실패했습니다`);
      }
    };

    if (selectedType === -1) {
      if (initialMajorId && initialMajorId > 0) {
        fetchAndSelectMajor((major) => major.majorId === initialMajorId);
      } else if (initialMajor && !initialMajorId) {
        fetchAndSelectMajor((major) => major.name === initialMajor);
      }
    }
  }, [initialMajor, initialMajorId, onMajorSelect, selectedType]);

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

export default MajorFilterForm;
