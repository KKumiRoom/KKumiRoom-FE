'use client';

import ProfileInfoSection from '@/components/organisms/ProfileInfoSection';
import ProfileRoadmapCard from '@/components/organisms/ProfileRoadmapCard';
import ProfileTop from '@/components/organisms/ProfileTop';

const profileInfo = {
  name: '김철수',
  profileImage: '/images/user.png',
  birthDate: '1990-01-01',
  phoneNumber: '010-1234-5678',
  address: '인천시 남동구',
  major: {
    majorId: 1,
    majorName: '소프트웨어 공학',
    description: '소프트웨어 공학에 대해 알아봐요.',
    recommendedCourses: '하나둘',
  },
  schoolName: '대인고등학교',
  grade: '3학년',
  class: '8반',
};

const ProfilePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <ProfileTop name={profileInfo.name} image={profileInfo.profileImage} />
      <div className='w-[90%] mt-8 mb-12'>
        <ProfileInfoSection profileData={profileInfo} />
      </div>
      <ProfileRoadmapCard
        majorId={profileInfo.major.majorId}
        majorName={profileInfo.major.majorName}
      />
    </div>
  );
};

export default ProfilePage;
