import {
  schoolAtom,
  schoolRegionAtom,
  gradeAtom,
} from '@/atoms/register/registerForm';
import DropdownForm from '@/components/organisms/DropdownForm';
import {
  SCHOOL_REGIONS,
  SCHOOLS_BY_REGION,
  GRADES,
} from '@/constants/schoolData';
import useRegisterField from '@/hooks/useRegisterField';

function RegisterSchoolInfo() {
  const [schoolRegion, setSchoolRegion] = useRegisterField(schoolRegionAtom);
  const [school, setSchool] = useRegisterField(schoolAtom);
  const [grade, setGrade] = useRegisterField(gradeAtom);

  // 지역이 변경될 때 학교 초기화
  const handleRegionChange = (value: string) => {
    setSchoolRegion(value);
    setSchool(''); // 지역이 바뀌면 학교 선택 초기화
    setGrade(''); // 지역이 바뀌면 학년 선택 초기화
  };

  // 현재 선택된 지역의 학교 목록
  const schoolOptions = schoolRegion
    ? SCHOOLS_BY_REGION[schoolRegion] || []
    : [];

  return (
    <div className='flex flex-col gap-4'>
      <DropdownForm
        title='학교 지역'
        value={schoolRegion}
        onChange={handleRegionChange}
        options={SCHOOL_REGIONS}
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
    </div>
  );
}

export default RegisterSchoolInfo;
