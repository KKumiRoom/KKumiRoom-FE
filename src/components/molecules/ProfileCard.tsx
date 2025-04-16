import { FaBirthdayCake } from 'react-icons/fa';
import { FaPhone, FaSchoolFlag } from 'react-icons/fa6';
import CircleImage from '../atoms/CircleImage';
import IconText from './IconText';

interface ProfileCardProps {
  name: string;
  profileImage: string;
  schoolInfo: string;
  birthDate: string;
  phoneNumber: string;
}

const ProfileCard = ({
  name,
  profileImage,
  schoolInfo,
  birthDate,
  phoneNumber,
}: ProfileCardProps) => {
  return (
    <div className='w-full min-h-80 rounded-2xl bg-cloud border border-gray-500'>
      <div className='flex flex-col items-center justify-center px-6 py-8'>
        <CircleImage
          src={profileImage || '/images/DefaultProfile.png'}
          alt={`${name}의 프로필 이미지`}
          size={100}
        />
        <div className='text-2xl font-semibold mt-2.5'>{name}</div>
        <div className='text-lg font-semibold mt-8 w-full flex flex-col gap-4'>
          <IconText icon={<FaSchoolFlag />} text={schoolInfo} />
          <IconText icon={<FaBirthdayCake />} text={birthDate} />
          <IconText icon={<FaPhone />} text={phoneNumber} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
