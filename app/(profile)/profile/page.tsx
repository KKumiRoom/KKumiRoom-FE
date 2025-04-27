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
  major: '소프트콘',
  schoolName: '대인고등학교',
  grade: '3학년',
  class: '8반',
};

const ProfilePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <ProfileTop
        name={profileInfo.name}
        image={profileInfo.profileImage}
        onEditClick={() => {}}
        onSignOut={() => {}}
      />
      <div className='w-[90%] mt-6 mb-10'>
        <ProfileInfoSection profileData={profileInfo} />
      </div>
      <ProfileRoadmapCard major={profileInfo.major} />
    </div>
  );
};

export default ProfilePage;
