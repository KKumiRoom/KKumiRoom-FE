import AppHeader from '@/components/containers/AppHeader';
import AppNavBar from '@/components/containers/AppNavBar';

const HeadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <div className='min-h-screen w-[90%] mx-auto pt-[4.5rem] pb-16'>
        {children}
      </div>
      <AppNavBar />
    </>
  );
};

export default HeadLayout;
