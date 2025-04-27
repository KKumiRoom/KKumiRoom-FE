import { Course } from '@/types/timetable';

interface CourseDetailProps {
  course: Course;
}

export default function CourseDetail({ course }: CourseDetailProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <p className='text-grey'>개설학기</p>
        <p>{course.semester}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-grey'>학과</p>
        <p>{course.courseArea}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-grey'>분류</p>
        <p>{course.courseType}</p>
      </div>
    </div>
  );
}
