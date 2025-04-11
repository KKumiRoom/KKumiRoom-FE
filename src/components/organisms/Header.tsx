import IconButton from '../molecules/IconButton';
import { ReactElement } from 'react';

interface HeaderProps {
  leftButton?: {
    icon: ReactElement<{ className?: string }>;
    onClick?: () => void;
    label: string;
  };
  rightButton?: {
    icon: ReactElement<{ className?: string }>;
    onClick?: () => void;
    label: string;
  };
}

const Header = ({ leftButton, rightButton }: HeaderProps) => {
    return (
      <header className='fixed top-0 left-0 right-0 flex items-center justify-between w-[90%] bg-background py-5 mx-auto z-10'>
        <div className='w-8'>
          {leftButton && (
            <IconButton 
              size='lg' 
              onClick={leftButton.onClick}
            >
              {leftButton.icon}
            </IconButton>
          )}
        </div>
        <div className='w-8 flex justify-end'>
          {rightButton && (
            <IconButton 
              size='lg' 
              onClick={rightButton.onClick}
            >
              {rightButton.icon}
            </IconButton>
          )}
        </div>
      </header>
  );
};

export default Header;
