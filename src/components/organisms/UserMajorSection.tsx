import { TUser } from '@/types';
import MajorInfoCard from '../molecules/MajorInfoCard';
import ProfileRoadmapCard from './ProfileRoadmapCard';

interface UserMajorSectionProps {
  user: TUser;
}

export default function UserMajorSection({ user }: UserMajorSectionProps) {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-lg font-semibold'>{user.userName}님의 희망 학과</p>
      {user.interestMajor ? (
        <MajorInfoCard major={user.interestMajor} />
      ) : (
        <ProfileRoadmapCard majorId={0} majorName='없음' />
      )}
    </div>
  );
}
