'use client';

import ButtonWithError from '@/components/molecules/ButtonWithError';
import OutlineInput from '@/components/molecules/OutlineInput';
import ProfileImageWithButton from '@/components/molecules/ProfileImageWithButton';
import useUserData from '@/hooks/useUserData';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCalendar, FaPhone, FaUser } from 'react-icons/fa6';
import { useState } from 'react';

export default function SettingProfilePage() {
  const [profileImage, setProfileImage] = useState(
    '/images/default-profile.png'
  );
  const [errorMessage, setErrorMessage] = useState(' ');
  const { user } = useUserData();

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    // S3 이미지 업로드 로직 추가
  };
  const handleSubmit = () => {
    console.log('submit');
  };
  const handleUserNameChange = (value: string) => {
    console.log(value);
  };
  const handleBirthChange = (value: string) => {
    console.log(value);
  };
  const handlePhoneChange = (value: string) => {
    console.log(value);
  };
  const handleAddressChange = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <h1 className='text-lg font-semibold pt-2 pb-6'>내정보 수정</h1>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-center items-center gap-4 mb-5'>
          <ProfileImageWithButton
            size={100}
            imageUrl={profileImage}
            onImageChange={handleImageChange}
          />
        </div>
        <OutlineInput
          icon={<FaUser />}
          value={user.userName}
          onChange={handleUserNameChange}
        />
        <OutlineInput
          icon={<FaCalendar />}
          value={user.birth}
          onChange={handleBirthChange}
        />
        <OutlineInput
          icon={<FaPhone />}
          value={user.phone}
          onChange={handlePhoneChange}
        />
        <OutlineInput
          icon={<FaMapMarkerAlt />}
          value={user.address}
          onChange={handleAddressChange}
        />
      </div>
      <ButtonWithError errorMessage={errorMessage} onClick={handleSubmit} />
    </div>
  );
}
