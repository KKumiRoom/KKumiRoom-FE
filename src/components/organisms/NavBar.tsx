import IconButton from '../molecules/IconButton';
import { NAVIGATION_ITEMS, type Page } from '@/constants/navigation';

interface NavBarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NavBar = ({ activePage, onNavigate }: NavBarProps) => {
  const isActive = (page: Page) => activePage === page;

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full bg-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10'>
      <nav className='flex items-center justify-between w-[90%] mx-auto p-2'>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <IconButton 
              key={item.id}
              size='lg' 
              text={item.label}
              className={`${isActive(item.id) ? 'text-primary scale-110' : 'text-grey'}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon />
            </IconButton>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
