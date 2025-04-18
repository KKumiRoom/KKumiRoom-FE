'use client';

import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../atoms/Button';
import TitleInput from '../molecules/TitleInput';

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(id, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='pb-10 pt-24 mx-auto flex flex-col justify-between min-h-[35rem]'
    >
      <div>
        <TitleInput
          title='아이디'
          value={id}
          onChange={setId}
          className='mb-10'
        />
        <TitleInput
          title='비밀번호'
          type='password'
          value={password}
          onChange={setPassword}
        />

        {error && <div className='mt-2 text-warning text-sm'>{error}</div>}
      </div>
      <div className='flex flex-col gap-4'>
        <Link
          className='text-right text-sm text-grey underline cursor-pointer'
          href='/register'
        >
          아직 회원이 아니신가요?
        </Link>
        <Button
          type='submit'
          fullWidth
          variant='primary'
          size='lg'
          disabled={id === '' || password === '' || isLoading}
        >
          로그인
        </Button>
      </div>
    </form>
  );
}
