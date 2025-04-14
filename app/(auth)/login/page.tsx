'use client';

import BottomSheet from '@/components/molecules/BottomSheet';
import LoginForm from '@/components/organisms/LoginForm';

export default function LoginPage() {
  return (
    <div className='h-screen bg-mint'>
      <BottomSheet>
        <LoginForm />
      </BottomSheet>
    </div>
  );
}
