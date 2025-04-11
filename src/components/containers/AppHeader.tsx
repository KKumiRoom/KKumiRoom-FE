'use client';

import Header from '@/components/organisms/Header';
import { FaAngleLeft, FaRegCircleUser } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

interface AppHeaderProps {
  showBackButton?: boolean;
}

const AppHeader = ({ showBackButton = true }: AppHeaderProps) => {
  const router = useRouter();

  return (
    <Header
      leftButton={
        showBackButton
          ? {
              icon: <FaAngleLeft />,
              label: '뒤로가기',
              onClick: () => router.back(),
            }
          : undefined
      }
      rightButton={{
        icon: <FaRegCircleUser />,
        label: '내정보',
        onClick: () => router.push('/profile'),
      }}
    />
  );
};

export default AppHeader;
