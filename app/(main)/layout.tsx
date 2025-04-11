import AppHeader from '@/components/containers/AppHeader';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader showBackButton={false} />
      <div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
