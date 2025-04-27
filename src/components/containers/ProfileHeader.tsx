'use client';

import Header from '@/components/organisms/Header';
import { FaAngleLeft, FaGear } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const ProfileHeader = () => {
  const router = useRouter();

  return (
    <Header
      leftButton={{
        icon: <FaAngleLeft />,
        label: '뒤로가기',
        onClick: () => router.back(),
      }}
      rightButton={{
        icon: <FaGear />,
        label: '설정',
        onClick: () => router.push('/setting'),
      }}
      transparent
    />
  );
};

export default ProfileHeader;
