'use client';

import ButtonWithError from '@/components/molecules/ButtonWithError';
import OutlineInput from '@/components/molecules/OutlineInput';
import DropdownForm from '@/components/organisms/DropdownForm';
import { EDUCATION_OFFICES, GRADES } from '@/constants/schoolData';
import { useSchoolData } from '@/hooks/useSchoolData';
import useUserApi from '@/hooks/useUserApi';
import useUserData from '@/hooks/useUserData';
import { TUser } from '@/types';
import { TSchoolList } from '@/types/data/TSchoolList';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ErrorToast, SuccessToast } from '@/lib/utils/notifications';

interface SchoolFormState {
  officeId: number;
  schoolId: number;
  grade: number;
  classNum: number;
}

// 에러 메시지 상수화
const ERROR_MESSAGES = {
  SCHOOL_NOT_FOUND: '선택된 학교를 찾을 수 없습니다',
  UPDATE_FAILED: '학교 정보 변경에 실패했습니다',
} as const;

// 초기화 로직 분리
const initializeFormState = (
  user: TUser,
  schoolsData: Record<string, TSchoolList>
) => {
  if (!user?.school?.schoolId) return null;

  const matchingEntry = Object.entries(schoolsData).find(
    ([region, schools]) => {
      const matchingSchool = schools.find(
        (school) => school.schoolId === user.school.schoolId
      );

      if (matchingSchool) {
        const educationOffice = EDUCATION_OFFICES.find(
          (office) => office.region === region
        );

        return educationOffice !== undefined;
      }

      return false;
    }
  );

  if (matchingEntry) {
    const [region, schools] = matchingEntry;
    const matchingSchool = schools.find(
      (school) => school.schoolId === user.school.schoolId
    );

    const educationOffice = EDUCATION_OFFICES.find(
      (office) => office.region === region
    );

    if (matchingSchool && educationOffice) {
      return {
        officeId: EDUCATION_OFFICES.indexOf(educationOffice),
        schoolId: matchingSchool.schoolId,
        grade: user.grade ? parseInt(user.grade, 10) : -1,
        classNum: user.classNum ? parseInt(user.classNum, 10) : -1,
      };
    }
  }

  return null;
};

export default function SettingSchoolPage() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUserData();
  const { updateUserSchool } = useUserApi();
  const { schoolsData } = useSchoolData();

  // 통합된 상태 관리
  const [formState, setFormState] = useState<SchoolFormState>({
    officeId: -1,
    schoolId: -1,
    grade: -1,
    classNum: -1,
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 교육청 옵션 생성
  const officeOptions = useMemo(
    () =>
      EDUCATION_OFFICES.map((office, index) => ({
        id: index,
        name: office.name,
      })),
    []
  );

  // 현재 선택된 교육청의 학교 목록
  const schoolOptions = useMemo(() => {
    const selectedOffice = EDUCATION_OFFICES[formState.officeId];
    return selectedOffice ? schoolsData[selectedOffice.region] || [] : [];
  }, [formState.officeId, schoolsData]);

  // 상태 업데이트 함수
  const updateFormState = useCallback((updates: Partial<SchoolFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  // 초기 데이터 로드
  const didInitRef = useRef(false); // 초기화 여부 추적

  useEffect(() => {
    if (
      !userLoading &&
      user &&
      !didInitRef.current &&
      Object.keys(schoolsData).length > 0
    ) {
      didInitRef.current = true;
      const initialState = initializeFormState(user, schoolsData);
      if (initialState) {
        setFormState(initialState);
      }
    }
  }, [userLoading, user, schoolsData]);

  // 핸들러 함수들
  const handleOfficeChange = useCallback(
    (id: number) => {
      updateFormState({
        officeId: id,
        schoolId: -1,
        grade: -1,
        classNum: -1,
      });
    },
    [updateFormState]
  );

  const handleSchoolChange = useCallback(
    (id: number) => {
      updateFormState({
        schoolId: id,
        grade: -1,
        classNum: -1,
      });
    },
    [updateFormState]
  );

  const handleGradeChange = useCallback(
    (id: number) => {
      updateFormState({
        grade: id,
        classNum: -1,
      });
    },
    [updateFormState]
  );

  const handleClassNumChange = useCallback(
    (value: string) => {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || -1;
      if (numericValue > 20) return; // 최대값 제한
      updateFormState({ classNum: numericValue });
    },
    [updateFormState]
  );

  const handleSubmit = useCallback(async () => {
    // 제출 시에만 검증
    if (formState.officeId === -1) {
      setErrorMessage('교육청을 선택하세요.');
      return;
    }

    if (formState.schoolId === -1) {
      setErrorMessage('학교를 선택하세요.');
      return;
    }

    if (formState.grade === -1) {
      setErrorMessage('학년을 선택하세요.');
      return;
    }

    if (formState.classNum === -1) {
      setErrorMessage('반을 입력하세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedSchoolInfo = schoolOptions.find(
        (school) => school.schoolId === formState.schoolId
      );

      if (!selectedSchoolInfo) {
        throw new Error(ERROR_MESSAGES.SCHOOL_NOT_FOUND);
      }

      await updateUserSchool(
        selectedSchoolInfo.schoolId,
        String(formState.classNum),
        String(formState.grade)
      );

      SuccessToast('학교 정보가 변경되었습니다');
      router.back();
    } catch (error) {
      ErrorToast(`학교 정보 변경에 실패했습니다${error}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, schoolOptions, updateUserSchool, router]);

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='text-lg font-semibold pt-2 pb-6'>
          학교 정보 등록/변경하기
        </h1>
      </div>

      <div className='flex flex-col gap-6'>
        <DropdownForm
          placeholder='교육청을 선택하세요'
          value={formState.officeId}
          onChange={handleOfficeChange}
          options={officeOptions}
          variant='outline'
          aria-label='교육청 선택'
        />
        <DropdownForm
          placeholder='학교를 선택하세요'
          value={formState.schoolId}
          onChange={handleSchoolChange}
          options={schoolOptions.map((school) => ({
            id: school.schoolId,
            name: school.schoolName,
          }))}
          disabled={formState.officeId === -1 || isSubmitting}
          variant='outline'
          aria-label='학교 선택'
        />
        <DropdownForm
          placeholder='학년'
          value={formState.grade}
          onChange={handleGradeChange}
          options={GRADES}
          disabled={formState.schoolId === -1 || isSubmitting}
          variant='outline'
          aria-label='학년 선택'
        />
        <OutlineInput
          value={formState.classNum === -1 ? '' : String(formState.classNum)}
          onChange={handleClassNumChange}
          type='number'
          aria-label='반 입력'
          rightElement={<p className='text-grey mr-3'>반</p>}
          min={1}
          max={20}
        />
      </div>
      <ButtonWithError
        errorMessage={errorMessage}
        onClick={handleSubmit}
        text='학교 정보 변경하기'
      />
    </div>
  );
}
