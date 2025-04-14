import { FaAngleRight } from 'react-icons/fa6';
import Link from 'next/link';
import Button from '../atoms/Button';

interface SubjectInfoCardProps {
  title: string;
  type: '공통' | '선택';
  code: string;
  className?: string;
}

export default function SubjectInfoCard({
  title,
  type,
  code,
  className = '',
}: SubjectInfoCardProps) {
  const buttonVariant = type === '공통' ? 'primary' : 'secondary';
  const borderColor =
    type === '공통' ? 'border-l-primary' : 'border-l-secondary';

  return (
    <div
      className={`flex justify-between items-center bg-cloud rounded-lg shadow-sm overflow-hidden border-l-6 ${borderColor} ${className}`}
    >
      <div className='py-3 px-5'>
        <h3 className='text-xl font-semibold mb-1'>{title}</h3>
        <p className='text-sm'>{`${type}과목`}</p>
      </div>

      <Link href={`/subject?code=${code}`}>
        <Button
          variant={buttonVariant}
          className='flex items-center rounded-full mr-4'
        >
          <span className='text-sm mr-1'>과목정보</span>
          <FaAngleRight />
        </Button>
      </Link>
    </div>
  );
}
