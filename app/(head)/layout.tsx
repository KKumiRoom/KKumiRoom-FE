import AppHeader from '@/components/containers/AppHeader';
import AppNavBar from '@/components/containers/AppNavBar';

const HeadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader />
      <div className='pt-[4.5rem]'>
        {children}
      </div>
      <AppNavBar />
    </div>
  );
};

export default HeadLayout;
