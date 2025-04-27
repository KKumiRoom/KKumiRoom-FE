import Badge from '@/components/atoms/Badge';
import CourseInfoCell from '@/components/molecules/CourseInfoCell';
import { TTimeTableResponse, TUser, BadgeVariant } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { RefObject } from 'react';

interface TodayClassesSectionProps {
  user: TUser;
  todayClasses: TTimeTableResponse[];
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  getBadgeVariant: (period: number) => BadgeVariant;
}

export default function TodayClassesSection({
  user,
  todayClasses,
  scrollContainerRef,
  getBadgeVariant,
}: TodayClassesSectionProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <p className='text-lg font-semibold'>오늘의 수업</p>
        <Badge text={user.school.schoolName} variant='gray' size='xs' />
      </div>

      <div className='flex w-full px-3 py-2 bg-secondary/50 rounded-full items-center justify-between text-[#75A9D0]'>
        <Image
          src='/images/cardImage/Clip.png'
          alt='bell'
          width={30}
          height={30}
        />
        <p className='text-sm font-semibold'>
          {user.school.schoolName}에 새로운 소식이 있어요!
        </p>
        <Link href={user.school.homepage}>
          <Badge text='보러가기' variant='cloud' size='sm' />
        </Link>
      </div>

      <div
        ref={scrollContainerRef}
        className='flex gap-2 overflow-x-auto scrollbar-hide py-2'
      >
        {todayClasses.length > 0
          ? todayClasses.map((course) => (
              <CourseInfoCell
                key={course.courseId}
                courseId={course.courseId}
                courseName={course.courseName}
                courseType={course.courseType || '공통'}
                period={course.period}
                status={getBadgeVariant(course.period)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
