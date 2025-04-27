'use client';

import KkumiRoomLogo from '@/components/atoms/KkumiRoomLogo';
import GreetingText from '@/components/molecules/GreetingText';
import MainAdCard from '@/components/molecules/MainAdCard';
import TodayClassesSection from '@/components/organisms/TodayClassesSection';
import UserMajorSection from '@/components/organisms/UserMajorSection';
import useDailyClasses from '@/hooks/useDailyClasses';
import useUserData from '@/hooks/useUserData';

/**
 * 메인 페이지 컴포넌트
 * - 사용자 정보 표시
 * - 메인 광고 카드 표시
 * - 사용자 희망 학과 정보 표시
 * - 오늘의 수업 정보 표시
 */
export default function Home() {
  // 사용자 정보 가져오기
  const { user, isLoading: isUserLoading } = useUserData();

  // 오늘의 수업 정보 가져오기
  const {
    todayClasses,
    scrollContainerRef,
    getBadgeVariant,
    isLoading: isClassesLoading,
  } = useDailyClasses();

  // 로딩 중이면 기본 화면 표시
  if (isUserLoading || isClassesLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <KkumiRoomLogo />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-12 pt-3'>
      {/* 인사말 및 광고 섹션 */}
      <div className='flex flex-col gap-4'>
        <GreetingText name={user.userName} />
        <MainAdCard />
      </div>

      {/* 희망 학과 섹션 */}
      <UserMajorSection user={user} />

      {/* 오늘의 수업 섹션 */}
      <TodayClassesSection
        user={user}
        todayClasses={todayClasses}
        scrollContainerRef={scrollContainerRef}
        getBadgeVariant={getBadgeVariant}
      />
    </div>
  );
}
