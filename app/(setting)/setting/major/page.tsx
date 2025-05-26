'use client';

import ButtonWithError from '@/components/molecules/ButtonWithError';
import DropdownForm from '@/components/organisms/DropdownForm';
import { DEPARTMENT_TYPES } from '@/constants/departmentData';
import { fetchMajorsByArea, MajorInfo } from '@/hooks/useMajorData';
import useUserApi from '@/hooks/useUserApi';
import useUserData from '@/hooks/useUserData';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ErrorToast, SuccessToast } from '@/lib/utils/notifications';
import { validateMajorSelection } from '@/lib/validation/majorValidationRule';

interface Option {
  id: number;
  name: string;
}

export default function SettingMajorPage() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUserData();
  const { updateInterestMajor } = useUserApi();
  const [selectedType, setSelectedType] = useState<number>(-1);
  const [departmentOptions, setDepartmentOptions] = useState<Option[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(-1);
  const [errorMessage, setErrorMessage] = useState<string>(' ');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 초기 유효성 검사
  useEffect(() => {
    if (!userLoading) {
      const validation = validateMajorSelection({
        selectedType,
        selectedDepartment,
        user,
        departmentOptions,
      });
      setErrorMessage(validation.errorMessage);
    }
  }, [userLoading, selectedType, selectedDepartment, user, departmentOptions]);

  const handleTypeChange = async (id: number) => {
    setSelectedType(id);
    setSelectedDepartment(-1);
    setErrorMessage(''); // 타입 변경 시 에러 메시지 초기화

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
      }
    } catch (error) {
      ErrorToast(`에러가 발생했습니다: ${error}`);
      setDepartmentOptions([]);
    }
  };

  const handleSubmit = async () => {
    const validation = validateMajorSelection({
      selectedType,
      selectedDepartment,
      user,
      departmentOptions,
    });

    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedMajor = departmentOptions.find(
        (dept) => dept.id === selectedDepartment
      );
      if (!selectedMajor) {
        throw new Error('선택된 학과를 찾을 수 없습니다');
      }

      await updateInterestMajor(selectedMajor.name);
      SuccessToast('관심학과가 변경되었습니다');
      router.back();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDepartmentChange = (id: number) => {
    setSelectedDepartment(id);
    setErrorMessage(''); // 학과 변경 시 에러 메시지 초기화
  };

  useEffect(() => {
    if (!userLoading && user?.interestMajor?.majorId) {
      const fetchInitialMajor = async () => {
        try {
          const userMajorId = user.interestMajor?.majorId;
          if (!userMajorId) return;

          // Promise.all을 사용하여 병렬로 모든 계열의 학과 정보를 가져옴
          const majorsByTypePromises = DEPARTMENT_TYPES.map((type) =>
            fetchMajorsByArea(type.name)
              .then((majors) => ({ type, majors }))
              .catch(() => ({ type, majors: [] }))
          );

          const results = await Promise.all(majorsByTypePromises);

          // 가져온 데이터에서 사용자의 학과 찾기
          const matchingResult = results.find(({ majors }) =>
            majors.some((major) => major.majorId === userMajorId)
          );

          if (matchingResult) {
            const { type, majors } = matchingResult;
            const matchingMajor = majors.find(
              (major) => major.majorId === userMajorId
            );

            if (matchingMajor) {
              setSelectedType(type.id);
              const options = majors.map((major) => ({
                id: major.majorId,
                name: major.name,
              }));
              setDepartmentOptions(options);
              setSelectedDepartment(matchingMajor.majorId);
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          ErrorToast(`에러가 발생했습니다`);
        }
      };

      fetchInitialMajor();
    }
  }, [user?.interestMajor?.majorId, userLoading]);

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='text-lg font-semibold pt-2 pb-6'>
          관심학과 등록/변경하기
        </h1>
        <p className='text-sm text-grey mb-6'>
          관심있는 학과를 선택하면 해당 학과의 커리큘럼과 추천 과목을 확인할 수
          있습니다.
        </p>
      </div>

      <div className='flex flex-col gap-6'>
        <DropdownForm
          placeholder='계열을 선택하세요'
          value={selectedType}
          onChange={handleTypeChange}
          options={DEPARTMENT_TYPES}
          variant='outline'
        />
        <DropdownForm
          placeholder='학과를 선택하세요'
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          options={departmentOptions}
          disabled={selectedType === -1 || isSubmitting}
          variant='outline'
        />
      </div>
      <ButtonWithError
        errorMessage={errorMessage}
        onClick={handleSubmit}
        text='관심학과 변경하기'
      />
    </div>
  );
}
