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
      <header className='flex items-center justify-between w-full py-5'>
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
