import Image from 'next/image';
import Link from 'next/link';

interface LinkCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export default function LinkCard({
  image,
  title,
  description,
  href,
  className = '',
}: LinkCardProps) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-4 p-[0.875rem] rounded-xl shadow-sm cursor-pointer ${className}`}
      >
        <div className='flex-shrink-0'>
          <div className='relative w-[3.75rem] h-[3.75rem]'>
            <Image
              src={image}
              alt={title}
              fill
              sizes='60px'
              className='object-contain'
            />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <p className='text-xl font-semibold'>{title}</p>
          <div className='h-[2rem]'>
            <p className='text-[0.8125rem] leading-tight'>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
