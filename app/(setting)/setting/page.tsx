'use client';

import Icon from '@/components/atoms/Icon';
import AppNavBar from '@/components/containers/AppNavBar';
import SettingsContainer from '@/components/containers/SettingsContainer';
import SettingProfile from '@/components/molecules/SettingProfile';
import SettingsMenu from '@/components/organisms/SettingsMenu';
import { FaGear } from 'react-icons/fa6';

export default function SettingPage() {
  return (
    <SettingsContainer>
      <div className='text-cloud text-[1.75rem] font-semibold flex items-center gap-2 pt-4'>
        <Icon size='xl'>
          <FaGear />
        </Icon>
        <p>설정</p>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-[48rem] bg-cloud shadow-2xl rounded-t-2xl'>
        <div className='flex flex-col gap-6 py-6'>
          <SettingProfile />

          <div className='border-b border-grey/50' />

          <SettingsMenu />
        </div>
      </div>

      <AppNavBar />
    </SettingsContainer>
  );
}
