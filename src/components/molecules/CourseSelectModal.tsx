import useUserData from '@/hooks/useUserData';
import { Course } from '@/types/timetable';
import { useState, useMemo } from 'react';
import Button from '../atoms/Button';
import DropdownForm from '../organisms/DropdownForm';
import CourseDetail from './CourseDetail';
import Modal from './Modal';

interface CourseSelectModalProps {
  courses: Course[];
  isOpen: boolean;
  onSelect: (courseId: number) => void;
  onClose: () => void;
}

const CourseSelectModal = ({
  courses,
  isOpen,
  onSelect,
  onClose,
}: CourseSelectModalProps) => {
  const [selectedCourse, setSelectedCourse] = useState<number>(-1);
  const { user } = useUserData();

  const currentSemester = useMemo(() => {
    const currentMonth = new Date().getMonth() + 1;
    return currentMonth <= 8 ? 1 : 2;
  }, []);

  const filteredCourses = useMemo(() => {
    if (!user || !user.grade) return courses;

    const targetSemester = `${user.grade} ${currentSemester}학기`;

    return courses.filter((course) => course.semester === targetSemester);
  }, [courses, user, currentSemester]);

  const handleCourseChange = (courseId: number) => {
    setSelectedCourse(courseId);
  };

  const handleSubmit = () => {
    if (selectedCourse !== -1) {
      onSelect(selectedCourse);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='p-6 flex flex-col'>
        <h2 className='text-xl font-semibold'>수업 선택</h2>
        <DropdownForm
          title=''
          placeholder='수업'
          value={selectedCourse}
          onChange={handleCourseChange}
          options={filteredCourses.map((course) => ({
            id: course.courseId,
            name: course.courseName,
          }))}
        />
        <div className='h-32 flex flex-col justify-center items-center'>
          {selectedCourse === -1 ? (
            <p>수업을 선택해 주세요</p>
          ) : (
            <div className='w-full'>
              <CourseDetail
                course={
                  filteredCourses.find(
                    (course) => course.courseId === selectedCourse
                  )!
                }
              />
            </div>
          )}
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <Button onClick={onClose} variant='gray'>
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedCourse === -1}
            variant='primary'
          >
            선택
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CourseSelectModal;
