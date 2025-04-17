import Timetable from '@/components/organisms/Timetable';
import { TimetableData } from '@/types/timetable';

const data: TimetableData = {
  월: {
    '1': {
      name: '공통국어I',
      color: 'bg-red-100',
      type: '공통',
      code: 'K1',
      teacher: '김철수',
      semester: '3학년 1학기',
      department: '일반',
      description: '공통국어I 설명',
    },
    '2': {
      name: '공통수학I',
      color: 'bg-blue-100',
      type: '공통',
      code: 'M1',
      teacher: '이영희',
      semester: '3학년 1학기',
      department: '일반',
      description: '공통수학I 설명',
    },
    '3': {
      name: '지구과학I',
      color: 'bg-green-100',
      type: '선택',
      code: 'Z1',
      teacher: '박영수',
      semester: '3학년 1학기',
      department: '일반',
      description: '지구과학I 설명',
    },
  },
};
const schoolInfo = {
  name: '대인고등학교',
  grade: '3학년',
  class: '8반',
};

const TimetablePage = () => {
  return (
    <div className='flex flex-col gap-3 py-3'>
      <h1 className='text-xl font-semibold'>
        {schoolInfo.name} {schoolInfo.grade} {schoolInfo.class}
      </h1>
      <Timetable data={data} />
    </div>
  );
};

export default TimetablePage;
