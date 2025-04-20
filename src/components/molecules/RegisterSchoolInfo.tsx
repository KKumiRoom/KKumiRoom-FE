import {
  schoolAtom,
  schoolRegionAtom,
  gradeAtom,
  classNumberAtom,
} from '@/atoms/register/registerForm';
import DropdownForm from '@/components/organisms/DropdownForm';
import { GRADES } from '@/constants/schoolData';
import useRegisterField from '@/hooks/useRegisterField';
import { schoolsDataAtom } from '@/hooks/useSchoolData';
import { SchoolInfo } from '@/types/data/TSchoolList';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import TitleInput from './TitleInput';

function RegisterSchoolInfo() {
  const [schoolRegion, setSchoolRegion] = useRegisterField(schoolRegionAtom);
  const [school, setSchool] = useRegisterField(schoolAtom);
  const [grade, setGrade] = useRegisterField(gradeAtom);
  const [classNumber, setClassNumber] = useRegisterField(classNumberAtom);

  // 학교 데이터 가져오기
  const schoolsData = useAtomValue(schoolsDataAtom);

  // 지역 목록을 Option 형태로 변환
  const regionOptions = useMemo(() => {
    return Object.keys(schoolsData).map((region, index) => ({
      id: index,
      name: region,
    }));
  }, [schoolsData]);

  // 현재 선택된 지역 id 찾기
  const selectedRegionId = useMemo(() => {
    const option = regionOptions.find((region) => region.name === schoolRegion);
    return option ? option.id : -1;
  }, [regionOptions, schoolRegion]);

  // 지역이 변경될 때 학교 초기화
  const handleRegionChange = (id: number) => {
    const selectedRegion = regionOptions.find((region) => region.id === id);
    if (selectedRegion) {
      setSchoolRegion(selectedRegion.name);
      setSchool('');
      setGrade('');
      setClassNumber('');
    }
  };

  // 현재 선택된 지역의 학교 목록을 Option 형태로 변환
  const schoolOptions = useMemo(() => {
    if (!schoolRegion || !schoolsData[schoolRegion]) return [];

    return schoolsData[schoolRegion].map((schoolInfo: SchoolInfo) => ({
      id: schoolInfo.schoolId,
      name: schoolInfo.schoolName,
    }));
  }, [schoolRegion, schoolsData]);

  // 현재 선택된 학교 id 찾기
  const selectedSchoolId = useMemo(() => {
    return school ? parseInt(school, 10) : -1;
  }, [school]);

  const handleSchoolChange = (id: number) => {
    setSchool(String(id));
  };

  // 현재 선택된 학년 id 찾기
  const selectedGradeId = useMemo(() => {
    const gradeNumber = grade ? parseInt(grade, 10) : -1;
    return gradeNumber;
  }, [grade]);

  const handleGradeChange = (id: number) => {
    setGrade(String(id));
  };

  return (
    <div className='flex flex-col gap-4'>
      <DropdownForm
        title='학교 지역'
        value={selectedRegionId}
        onChange={handleRegionChange}
        options={regionOptions}
      />

      <DropdownForm
        title='학교'
        value={selectedSchoolId}
        onChange={handleSchoolChange}
        options={schoolOptions}
        disabled={!schoolRegion}
      />

      <DropdownForm
        title='학년'
        value={selectedGradeId}
        onChange={handleGradeChange}
        options={GRADES}
        disabled={!school}
      />

      <TitleInput
        title='반'
        value={classNumber}
        onChange={setClassNumber}
        placeholder='반을 입력해주세요'
        disabled={!school}
      />
    </div>
  );
}

export default RegisterSchoolInfo;
