'use client';

import { useRouter } from 'next/navigation';
import Badge from '../atoms/Badge';

interface CourseInfoCellProps {
  courseId: number;
  courseName: string;
  courseType: string;
  period: number;
  status?: 'selected' | 'previous' | 'next';
}
export default function CourseInfoCell({
  courseId,
  courseName,
  courseType,
  period,
  status = 'next',
}: CourseInfoCellProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/subject/${courseId}`);
  };
  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg min-w-24 py-3 px-5 shadow-md ${
        courseType === '선택' ? 'bg-primary/40' : 'bg-tertiary'
      }`}
    >
      <Badge
        text={`${period}교시`}
        variant={status}
        size='sm'
        className='w-12'
      />
      <p className='text-xs font-semibold'>{courseName}</p>
    </button>
  );
}
