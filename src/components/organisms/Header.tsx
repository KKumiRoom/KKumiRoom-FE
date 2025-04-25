import { ReactElement } from 'react';
import IconButton from '../molecules/IconButton';

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
  transparent?: boolean;
}

const Header = ({
  leftButton,
  rightButton,
  transparent = false,
}: HeaderProps) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 w-full max-w-[var(--device-width)] mx-auto ${transparent ? 'bg-transparent' : 'bg-background'}`}
    >
      <div className='flex items-center justify-between w-[90%] mx-auto py-5'>
        <div className='w-8'>
          {leftButton && (
            <IconButton size='lg' onClick={leftButton.onClick}>
              {leftButton.icon}
            </IconButton>
          )}
        </div>
        <div className='w-8 flex justify-end'>
          {rightButton && (
            <IconButton size='lg' onClick={rightButton.onClick}>
              {rightButton.icon}
            </IconButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
