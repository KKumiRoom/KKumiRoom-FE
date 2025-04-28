'use client';

import CircleImage from '@/components/atoms/CircleImage';
import useUserData from '@/hooks/useUserData';

const SettingProfile = () => {
  const { user } = useUserData();
  return (
    <div className='flex items-center gap-2 px-6'>
      <CircleImage
        src={user.profileImage || '/images/user.png'}
        alt='profile'
        size={40}
      />
      <p className='text-lg font-semibold'>{user.userName}</p>
    </div>
  );
};

export default SettingProfile;
