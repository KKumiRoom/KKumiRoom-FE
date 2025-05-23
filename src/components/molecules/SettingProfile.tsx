'use client';

import CircleImage from '@/components/atoms/CircleImage';
import useUserData from '@/hooks/useUserData';

const SettingProfile = () => {
  const { user } = useUserData();
  return (
    <div className='flex items-center gap-2 px-6'>
      <CircleImage
        src={user.imageUrl || '/images/default-profile.png'}
        alt='profile'
        size={40}
        className='bg-cloud shadow-md'
      />
      <p className='text-lg font-semibold'>{user.userName}</p>
    </div>
  );
};

export default SettingProfile;
