'use client';

import Icon from '@/components/atoms/Icon';
import useAuth from '@/hooks/useAuth';
import { FaChevronRight } from 'react-icons/fa6';
import Link from 'next/link';

interface MenuItemProps {
  href?: string;
  label: string;
  onClick?: () => void;
}

const MenuItem = ({ href, label, onClick }: MenuItemProps) => {
  const content = (
    <div className='flex justify-between items-center'>
      <p>{label}</p>
      <Icon size='sm'>
        <FaChevronRight />
      </Icon>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className='cursor-pointer'>
      {content}
    </button>
  );
};

const SettingsMenu = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className='flex flex-col gap-8 px-6 w-full'>
        <MenuItem href='/setting/profile' label='내 정보 수정' />
        <MenuItem href='/setting/school' label='학교 정보 수정' />
        <MenuItem href='/setting/password' label='비밀번호 변경' />
        <MenuItem href='/setting/major' label='관심학과 등록/변경하기' />
      </div>

      <div className='border-b border-grey/50' />

      <div className='flex flex-col gap-8 px-6 w-full'>
        <MenuItem href='/setting/policy' label='개인정보 보호정책' />
        <MenuItem href='/setting/appInfo' label='앱 정보' />
        <MenuItem label='로그아웃' onClick={handleLogout} />
      </div>
    </>
  );
};

export default SettingsMenu;
