import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';

interface LinkCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}
const paperlogy = localFont({
  src: [
    {
      path: '../../../public/fonts/Paperlogy/Paperlogy-6SemiBold.ttf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../../../public/fonts/Paperlogy/Paperlogy-4Regular.ttf',
      weight: '400',
      style: 'regular',
    },
  ],
  variable: '--font-paperlogy',
});
export default function LinkCard({
  image,
  title,
  description,
  href,
  className = '',
}: LinkCardProps) {
  return (
    <div className='w-full'>
      <Link href={href}>
        <div
          className={`flex items-center gap-4 p-[0.875rem] rounded-xl shadow-sm cursor-pointer ${paperlogy.className} ${className}`}
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
            <p className='text-lg font-semibold'>{title}</p>
            <div className='h-[2rem]'>
              <p className='text-xs leading-tight font-regular'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
