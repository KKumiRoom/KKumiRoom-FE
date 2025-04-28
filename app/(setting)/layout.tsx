'use client';

import AppHeader from '@/components/containers/AppHeader';
import { usePathname } from 'next/navigation';

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSettingPage = pathname === '/setting';
  return (
    <div>
      <AppHeader showUserButton={false} transparent={isSettingPage} />
      <div className='min-h-screen w-[90%] mx-auto pt-[4.5rem] pb-16'>
        {children}
      </div>
    </div>
  );
};

export default SettingLayout;
