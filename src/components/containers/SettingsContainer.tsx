import { FaGear } from 'react-icons/fa6';
import { ReactNode } from 'react';
import Icon from '../atoms/Icon';

interface SettingsContainerProps {
  children: ReactNode;
}

const SettingsContainer = ({ children }: SettingsContainerProps) => {
  return (
    <div>
      <div className='fixed top-0 left-0 right-0 h-[18.75rem] max-w-[var(--device-width)] mx-auto bg-primary'>
        <div className='text-cloud text-[1.75rem] font-semibold flex items-center gap-2 pt-20 px-6'>
          <Icon size='xl'>
            <FaGear />
          </Icon>
          <p>설정</p>
        </div>
      </div>
      <div className='fixed top-[18.75rem] left-0 right-0 bottom-0 max-w-[var(--device-width)] mx-auto bg-background' />
      <div className='relative min-h-screen'>{children}</div>
    </div>
  );
};

export default SettingsContainer;
