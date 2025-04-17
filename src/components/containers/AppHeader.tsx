'use client';

import Header from '@/components/organisms/Header';
import { FaAngleLeft, FaRegCircleUser } from 'react-icons/fa6';
import { usePathname, useRouter } from 'next/navigation';

interface AppHeaderProps {
  showBackButton?: boolean;
  showUserButton?: boolean;
}

const AppHeader = ({
  showBackButton = true,
  showUserButton = true,
}: AppHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSubjectPage = /^\/subject\/[^\/]+$/.test(pathname);

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
      rightButton={
        showUserButton
          ? {
              icon: <FaRegCircleUser />,
              label: '내정보',
              onClick: () => router.push('/profile'),
            }
          : undefined
      }
      transparent={isSubjectPage}
    />
  );
};

export default AppHeader;
