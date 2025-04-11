import AppHeader from '@/components/containers/AppHeader';

const HeadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader />
      <div>
        {children}
      </div>
    </div>
  );
};

export default HeadLayout;
