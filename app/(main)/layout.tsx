import AppHeader from '@/components/containers/AppHeader';
import AppNavBar from '@/components/containers/AppNavBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader showBackButton={false} />
      <div className='min-h-screen w-[90%] mx-auto pt-[4.5rem] pb-16'>
        {children}
      </div>
      <AppNavBar />
    </div>
  );
};

export default MainLayout;
