import AppHeader from '@/components/containers/AppHeader';
import AppNavBar from '@/components/containers/AppNavBar';
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader showBackButton={false} />
      <div className='pt-[4.5rem]'>
        {children}
      </div>
      <AppNavBar />
    </div>
  );
};

export default MainLayout;
