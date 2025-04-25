import { ReactElement } from 'react';
import Icon from '../atoms/Icon';

interface ProfileInfoProps {
  icon: ReactElement<{ className?: string }>;
  value: string;
}

export default function ProfileInfo({ icon, value }: ProfileInfoProps) {
  return (
    <div className='flex items-center gap-12 w-full h-5'>
      <Icon className='flex'>{icon}</Icon>
      <div className='flex-1'>
        <p className='text-lg'>{value}</p>
      </div>
    </div>
  );
}
