import Timetable from '@/components/molecules/Timetable';

const data = {
  월: {
    '1': { name: '공통국어I', color: 'bg-red-100' },
    '2': { name: '공통수학I', color: 'bg-blue-100' },
    '3': { name: '공통사회I', color: 'bg-green-100' },
    '4': { name: '공통과학I', color: 'bg-yellow-100' },
    '5': { name: '공통영어I', color: 'bg-purple-100' },
    '6': { name: '공통영어II', color: 'bg-orange-100' },
    '7': { name: '공통영어III', color: 'bg-pink-100' },
    '8': { name: '공통영어IV', color: 'bg-brown-100' },
  },
};
const schoolInfo = {
  name: '대인고등학교',
  grade: '1학년',
  class: '1반',
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
