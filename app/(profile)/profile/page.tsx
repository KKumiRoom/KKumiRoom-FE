'use client';

import KkumiRoomLogo from '@/components/atoms/KkumiRoomLogo';
import ProfileInfoSection from '@/components/organisms/ProfileInfoSection';
import ProfileRoadmapCard from '@/components/organisms/ProfileRoadmapCard';
import ProfileTop from '@/components/organisms/ProfileTop';
import useUserData from '@/hooks/useUserData';

const ProfilePage = () => {
  const { user, isLoading } = useUserData();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <KkumiRoomLogo />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <ProfileTop name={user.userName} image={user.imageUrl} />
      <div className='w-[90%] mt-8 mb-12'>
        <ProfileInfoSection
          profileData={{
            name: user.userName,
            birthDate: user.birth,
            phoneNumber: user.phone,
            address: user.address,
            schoolName: user.school.schoolName,
            grade: user.grade,
            class: user.classNum,
          }}
        />
      </div>
      {user.interestMajor ? (
        <ProfileRoadmapCard
          majorId={user.interestMajor.majorId}
          majorName={user.interestMajor.majorName}
        />
      ) : (
        <ProfileRoadmapCard majorId={0} majorName='' />
      )}
    </div>
  );
};

export default ProfilePage;
