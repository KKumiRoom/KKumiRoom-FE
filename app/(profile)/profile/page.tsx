'use client';

import IconButton from '@/components/molecules/IconButton';
import LinkCard from '@/components/molecules/LinkCard';
import ProfileInfo from '@/components/molecules/ProfileInfo';
import { BiSolidPencil } from 'react-icons/bi';
import { FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone, FaSchool, FaUser } from 'react-icons/fa6';
import { PiSignOutBold } from 'react-icons/pi';
import Image from 'next/image';
import { useState } from 'react';

const profileInfo = {
  name: '김철수',
  profileImage: '/images/user.png',
  birthDate: '1990-01-01',
  phoneNumber: '010-1234-5678',
  address: '인천시 남동구',
  major: '소프트웨어공학과',
  schoolName: '대인고등학교',
  grade: '3학년',
  class: '8반',
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-semibold pt-9 text-cloud'>
        {profileInfo.name}
      </h1>
      <div className='relative py-6 h-40 w-full'>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cloud rounded-full border border-grey'>
          <Image
            src={profileInfo.profileImage}
            alt='profile'
            width={100}
            height={100}
          />
        </div>

        <div className='absolute right-2 top-1/2 transform -translate-y-10 flex gap-2'>
          <IconButton
            className='border-2 border-cloud text-cloud rounded-xl'
            size='md'
            onClick={() => setIsEditing(!isEditing)}
          >
            <BiSolidPencil />
          </IconButton>
          <IconButton
            className='border-2 border-cloud text-cloud rounded-xl'
            size='md'
          >
            <PiSignOutBold />
          </IconButton>
        </div>
      </div>
      <div className='flex flex-col gap-6 w-[90%] mt-6 mb-10'>
        <ProfileInfo icon={<FaUser />} value={profileInfo.name} />
        <ProfileInfo icon={<FaBirthdayCake />} value={profileInfo.birthDate} />
        <ProfileInfo icon={<FaPhone />} value={profileInfo.phoneNumber} />
        <ProfileInfo icon={<FaMapMarkerAlt />} value={profileInfo.address} />
        <ProfileInfo
          icon={<FaSchool />}
          value={`${profileInfo.schoolName} ${profileInfo.grade} ${profileInfo.class}`}
        />
      </div>

      {profileInfo.major === '' ? (
        <LinkCard
          image='/images/cardImage/think.png'
          title='나의 진로 찾기'
          description='꾸미룸과 함께 나의 진로를 찾아봐요.'
          href='/roadmap'
          className='bg-[#D2DAE0]'
        />
      ) : (
        <LinkCard
          image='/images/cardImage/think.png'
          title={`${profileInfo.major}에 가려면?`}
          description={`${profileInfo.major}에 가기위해 들어야할 수업에 대해 알아봐요.`}
          href='/roadmap/software-engineering'
          className='bg-[#D2DAE0]'
        />
      )}
    </div>
  );
};

export default ProfilePage;
