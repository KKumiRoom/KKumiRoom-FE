import { FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone, FaSchool, FaUser } from 'react-icons/fa6';
import ProfileInfo from '../molecules/ProfileInfo';

interface ProfileInfoSectionProps {
  profileData: {
    name: string;
    birthDate: string;
    phoneNumber: string;
    address: string;
    schoolName: string;
    grade: string;
    class: string;
  };
}

export default function ProfileInfoSection({
  profileData,
}: ProfileInfoSectionProps) {
  const phoneNumber = profileData.phoneNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    '$1-$2-$3'
  );
  return (
    <div className='flex flex-col gap-8'>
      <ProfileInfo icon={<FaUser />} value={profileData.name} />
      <ProfileInfo icon={<FaBirthdayCake />} value={profileData.birthDate} />
      <ProfileInfo icon={<FaPhone />} value={phoneNumber} />
      <ProfileInfo icon={<FaMapMarkerAlt />} value={profileData.address} />
      <ProfileInfo
        icon={<FaSchool />}
        value={`${profileData.schoolName} ${profileData.grade} ${profileData.class}`}
      />
    </div>
  );
}
