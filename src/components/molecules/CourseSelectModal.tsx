import { Course } from '@/types/timetable';
import { useState } from 'react';
import Button from '../atoms/Button';
import DropdownForm from '../organisms/DropdownForm';
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
          options={courses.map((course) => ({
            id: course.courseId,
            name: course.courseName,
          }))}
        />
        <div className='h-32 flex flex-col justify-center items-center'>
          <p>로고</p>
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
