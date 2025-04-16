import AppHeader from '@/components/containers/AppHeader';
import AppNavBar from '@/components/containers/AppNavBar';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen w-[90%] mx-auto'>
      <AppHeader showUserButton={false} />
      <div className='pt-[4.5rem] pb-16'>{children}</div>
      <AppNavBar />
    </div>
  );
};

export default ProfileLayout;
