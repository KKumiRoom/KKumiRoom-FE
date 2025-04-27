'use client';

import KkumiRoomLogo from '@/components/atoms/KkumiRoomLogo';
import GreetingText from '@/components/molecules/GreetingText';
import MainAdCard from '@/components/molecules/MainAdCard';
import TodayClassesSection from '@/components/organisms/TodayClassesSection';
import UserMajorSection from '@/components/organisms/UserMajorSection';
import useDailyClasses from '@/hooks/useDailyClasses';
import useUserData from '@/hooks/useUserData';

export default function Home() {
  const { user, isLoading: isUserLoading } = useUserData();

  const {
    todayClasses,
    scrollContainerRef,
    getBadgeVariant,
    isLoading: isClassesLoading,
  } = useDailyClasses();

  if (isUserLoading || isClassesLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <KkumiRoomLogo />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-12 pt-3'>
      <div className='flex flex-col gap-4'>
        <GreetingText name={user.userName} />
        <MainAdCard />
      </div>
      <UserMajorSection user={user} />
      <TodayClassesSection
        user={user}
        todayClasses={todayClasses}
        scrollContainerRef={scrollContainerRef}
        getBadgeVariant={getBadgeVariant}
      />
    </div>
  );
}
