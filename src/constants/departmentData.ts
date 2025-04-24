import { FaChalkboardTeacher, FaUniversity } from 'react-icons/fa';
import { FaBook, FaUserGraduate, FaUsers } from 'react-icons/fa6';

interface Option {
  id: number;
  name: string;
}
const DEPARTMENT_TYPES: Option[] = [
  { id: 1, name: '공학' },
  { id: 2, name: '사회과학' },
  { id: 3, name: '인문사회' },
  { id: 4, name: '예체능' },
  { id: 5, name: '의학' },
];

const SECTION_TYPES = {
  DESCRIPTION: {
    icon: FaChalkboardTeacher,
    variant: 'primary',
    title: '학과 설명',
  },
  RELATED: {
    icon: FaUniversity,
    variant: 'confirm',
    title: '유사 학과',
  },
  SUBJECTS: {
    icon: FaBook,
    variant: 'lemon',
    title: '전공 과목',
  },
  RECOMMEND: {
    icon: FaUsers,
    variant: 'primary',
    title: '추천 학생',
  },
  CAREER: {
    icon: FaUserGraduate,
    variant: 'confirm',
    title: '진로 탐색',
  },
} as const;

export { DEPARTMENT_TYPES, SECTION_TYPES };
