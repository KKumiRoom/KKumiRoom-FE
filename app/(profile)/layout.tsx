import AppNavBar from '@/components/containers/AppNavBar';
import ProfileHeader from '@/components/containers/ProfileHeader';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 right-0 h-[13.75rem] bg-primary' />
        <div className='absolute top-[13.75rem] left-0 right-0 bottom-0 bg-background' />
      </div>
      <ProfileHeader />
      <div className='relative z-10 min-h-screen w-[90%] mx-auto pt-[4.5rem] pb-16'>
        {children}
      </div>
      <AppNavBar />
    </div>
  );
};

export default ProfileLayout;
