'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import Button from '../atoms/Button';
import TitleInput from '../molecules/TitleInput';
import Link from 'next/link';

export default function LoginForm() {
  const { login } = useAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(id, password);
    setId('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className='pb-10 pt-24 mx-auto flex flex-col justify-between min-h-[35rem]'>
      <div>
        <TitleInput title='아이디' value={id} onChange={setId} className='mb-10'/>
        <TitleInput title='비밀번호' type='password' value={password} onChange={setPassword} />
      </div>
      <div className='flex flex-col gap-4'>
        <Link className='text-right text-sm text-grey underline cursor-pointer' href='/register'>
          아직 회원이 아니신가요?
        </Link>
        <Button type='submit' fullWidth variant='primary' size='lg' disabled={id === '' || password === ''}>
          로그인
        </Button>
      </div>
    </form>
  );
}
