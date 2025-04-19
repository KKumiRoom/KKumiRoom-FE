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
import { useAtomValue } from 'jotai';
import TitleInput from './TitleInput';

function RegisterSchoolInfo() {
  const [schoolRegion, setSchoolRegion] = useRegisterField(schoolRegionAtom);
  const [school, setSchool] = useRegisterField(schoolAtom);
  const [grade, setGrade] = useRegisterField(gradeAtom);
  const [classNumber, setClassNumber] = useRegisterField(classNumberAtom);

  // 학교 데이터 가져오기
  const schoolsData = useAtomValue(schoolsDataAtom);

  // 지역이 변경될 때 학교 초기화
  const handleRegionChange = (value: string) => {
    setSchoolRegion(value);
    setSchool('');
    setGrade('');
    setClassNumber('');
  };

  // 지역 목록 (API에서 받아온 데이터 기반)
  const regionOptions = Object.keys(schoolsData);

  // 현재 선택된 지역의 학교 목록
  const schoolOptions =
    schoolRegion && schoolsData[schoolRegion] ? schoolsData[schoolRegion] : [];

  return (
    <div className='flex flex-col gap-4'>
      <DropdownForm
        title='학교 지역'
        value={schoolRegion}
        onChange={handleRegionChange}
        options={regionOptions}
      />

      <DropdownForm
        title='학교'
        value={school}
        onChange={setSchool}
        options={schoolOptions}
        disabled={!schoolRegion}
      />

      <DropdownForm
        title='학년'
        value={grade}
        onChange={setGrade}
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
