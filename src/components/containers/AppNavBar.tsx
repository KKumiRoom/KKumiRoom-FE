'use client';

import { usePathname, useRouter } from 'next/navigation';
import NavBar from '../organisms/NavBar';
import { PAGE, type Page } from '@/constants/navigation';

const AppNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getActivePage = (): Page => {
    if (pathname === '/') return PAGE.HOME;
    const page = pathname.split('/')[1] as Page;
    return page;
  };

  const handleNavigation = (page: Page) => {
    const path = page === PAGE.HOME ? '/' : `/${page}`;
    router.push(path);
  };

  return (
    <NavBar 
      activePage={getActivePage()}
      onNavigate={handleNavigation}
    />
  );
};

export default AppNavBar;