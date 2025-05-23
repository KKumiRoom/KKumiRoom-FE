'use client';

import { FaCamera } from 'react-icons/fa';
import { useRef } from 'react';
import CircleImage from '../atoms/CircleImage';

interface ProfileImageWithButtonProps {
  imageUrl?: string;
  size: number;
  className?: string;
  onImageChange?: (file: File) => void;
}

const ProfileImageWithButton = ({
  imageUrl = '/images/default-profile.png',
  size,
  className,
  onImageChange,
}: ProfileImageWithButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <CircleImage
        src={imageUrl}
        alt='profile'
        size={size}
        className={`bg-cloud shadow-lg ${className}`}
      />

      <button
        onClick={handleButtonClick}
        className='absolute bottom-0 right-0 bg-primary text-cloud rounded-full p-2 shadow-md hover:bg-primary/80 transition-colors z-20 border'
        aria-label='프로필 이미지 변경'
      >
        <FaCamera size={size / 5} />
      </button>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='image/*'
        className='hidden'
      />
    </div>
  );
};

export default ProfileImageWithButton;
