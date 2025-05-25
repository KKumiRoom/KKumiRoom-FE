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
  const [profileImage, setProfileImage] = useState(
    '/images/default-profile.png'
  );
  const [errorMessage, setErrorMessage] =
    useState('이전 사용자 정보와 같습니다');
  const [userFormState, setUserFormState] = useState({
    userName: '',
    birth: '',
    phone: '',
    address: '',
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
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userName, user?.birth, user?.phone, user?.address]);

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    // S3 이미지 업로드 로직 추가
  };

  const validateAndSetError = (field: string, value: string) => {
    const validationError = validateProfile(
      field === 'userName' ? value : userFormState.userName,
      field === 'birth' ? value : userFormState.birth,
      field === 'phone' ? value : userFormState.phone,
      field === 'address' ? value : userFormState.address,
      user.userName,
      formatDate(user.birth),
      formatPhoneNumber(user.phone),
      user.address
    );
    setErrorMessage(validationError);
  };

  const handleUserNameChange = (value: string) => {
    setUserFormState({ ...userFormState, userName: value });
    validateAndSetError('userName', value);
  };

  const handleBirthChange = (value: string) => {
    const formattedDate = formatDate(value);
    setUserFormState({ ...userFormState, birth: formattedDate });
    validateAndSetError('birth', formattedDate);
  };

  const handlePhoneChange = (value: string) => {
    const formattedPhone = formatPhoneNumber(value);
    setUserFormState({ ...userFormState, phone: formattedPhone });
    validateAndSetError('phone', formattedPhone);
  };

  const handleAddressChange = (value: string) => {
    setUserFormState({ ...userFormState, address: value });
    validateAndSetError('address', value);
  };

  const handleSubmit = async () => {
    const validationError = validateProfile(
      userFormState.userName,
      userFormState.birth,
      userFormState.phone,
      userFormState.address,
      user.userName,
      formatDate(user.birth),
      formatPhoneNumber(user.phone),
      user.address
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
          profileImage === '/images/default-profile.png' ? '' : profileImage
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
            imageUrl={profileImage}
            onImageChange={handleImageChange}
          />
        </div>
        <OutlineInput
          icon={<FaUser />}
          value={userFormState.userName}
          onChange={handleUserNameChange}
        />
        <OutlineInput
          icon={<FaCalendar />}
          value={userFormState.birth}
          onChange={handleBirthChange}
        />
        <OutlineInput
          icon={<FaPhone />}
          value={userFormState.phone}
          onChange={handlePhoneChange}
        />
        <OutlineInput
          icon={<FaMapMarkerAlt />}
          value={userFormState.address}
          onChange={handleAddressChange}
        />
      </div>
      <ButtonWithError errorMessage={errorMessage} onClick={handleSubmit} />
    </div>
  );
}
