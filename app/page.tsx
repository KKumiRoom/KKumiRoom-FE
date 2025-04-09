'use client';

import IconButton from '@/components/molecules/IconButton';
import { FaArrowLeft } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <IconButton onClick={() => alert('clicked')}>
        <FaArrowLeft />
      </IconButton>
    </div>
  );
}
