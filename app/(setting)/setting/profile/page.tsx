'use client';

import ButtonWithError from '@/components/molecules/ButtonWithError';
import OutlineInput from '@/components/molecules/OutlineInput';
import ProfileImageWithButton from '@/components/molecules/ProfileImageWithButton';
import useUserApi from '@/hooks/useUserApi';
import useUserData from '@/hooks/useUserData';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCalendar, FaPhone, FaUser } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatDate, formatPhoneNumber } from '@/lib/utils/formatters';
import { ErrorToast, SuccessToast } from '@/lib/utils/notifications';
import { validateProfile } from '@/lib/validation/profileValidationRule';

export default function SettingProfilePage() {
  const [errorMessage, setErrorMessage] =
    useState('이전 사용자 정보와 같습니다');
  const [userFormState, setUserFormState] = useState({
    userName: '',
    birth: '',
    phone: '',
    address: '',
    imageUrl: '',
  });
  const { user } = useUserData();
  const { updateUserProfile } = useUserApi();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserFormState({
        userName: user.userName,
        birth: formatDate(user.birth),
        phone: formatPhoneNumber(user.phone),
        address: user.address,
        imageUrl: user.imageUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userName, user?.birth, user?.phone, user?.address, user?.imageUrl]);

  const validateAndSetError = (field: string, value: string) => {
    const validationError = validateProfile(
      field === 'userName' ? value : userFormState.userName,
      field === 'birth' ? value : userFormState.birth,
      field === 'phone' ? value : userFormState.phone,
      field === 'address' ? value : userFormState.address,
      field === 'imageUrl' ? value : userFormState.imageUrl,
      user.userName,
      formatDate(user.birth),
      formatPhoneNumber(user.phone),
      user.address,
      user.imageUrl
    );
    setErrorMessage(validationError);
  };

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUserFormState((prevState) => ({ ...prevState, imageUrl }));
    validateAndSetError('imageUrl', imageUrl);

    // TODO: S3 이미지 업로드 로직 추가
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'birth') {
      formattedValue = formatDate(value);
    } else if (field === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }

    setUserFormState((prevState) => ({
      ...prevState,
      [field]: formattedValue,
    }));
    validateAndSetError(field, formattedValue);
  };

  const handleSubmit = async () => {
    const validationError = validateProfile(
      userFormState.userName,
      userFormState.birth,
      userFormState.phone,
      userFormState.address,
      userFormState.imageUrl,
      user.userName,
      formatDate(user.birth),
      formatPhoneNumber(user.phone),
      user.address,
      user.imageUrl
    );
    if (validationError) {
      setErrorMessage(validationError);
    }
    if (validationError === '') {
      try {
        await updateUserProfile(
          userFormState.userName,
          userFormState.birth,
          userFormState.phone,
          userFormState.address,
          userFormState.imageUrl === '/images/default-profile.png'
            ? ''
            : userFormState.imageUrl
        );
        SuccessToast('프로필 수정이 완료되었습니다');
        router.back();
      } catch (error) {
        ErrorToast(`프로필 수정에 실패했습니다${error}`);
      }
    }
  };

  return (
    <div>
      <h1 className='text-lg font-semibold pt-2 pb-6'>내정보 수정</h1>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-center items-center gap-4 mb-5'>
          <ProfileImageWithButton
            size={100}
            imageUrl={userFormState.imageUrl || '/images/default-profile.png'}
            onImageChange={handleImageChange}
          />
        </div>
        <OutlineInput
          icon={<FaUser />}
          value={userFormState.userName}
          onChange={(value) => handleInputChange('userName', value)}
          id='userName'
        />
        <OutlineInput
          icon={<FaCalendar />}
          value={userFormState.birth}
          onChange={(value) => handleInputChange('birth', value)}
          id='birth'
        />
        <OutlineInput
          icon={<FaPhone />}
          value={userFormState.phone}
          onChange={(value) => handleInputChange('phone', value)}
          id='phone'
        />
        <OutlineInput
          icon={<FaMapMarkerAlt />}
          value={userFormState.address}
          onChange={(value) => handleInputChange('address', value)}
          id='address'
        />
      </div>
      <ButtonWithError errorMessage={errorMessage} onClick={handleSubmit} />
    </div>
  );
}
