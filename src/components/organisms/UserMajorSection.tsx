import { TUser } from '@/types';
import MajorInfoCard from '../molecules/MajorInfoCard';

interface UserMajorSectionProps {
  user: TUser;
}

/**
 * 사용자의 희망 학과 정보를 표시하는 컴포넌트
 */
export default function UserMajorSection({ user }: UserMajorSectionProps) {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-lg font-semibold'>{user.name}님의 희망 학과</p>
      {user.interestMajor ? (
        <MajorInfoCard major={user.interestMajor} />
      ) : (
        <div className='w-full bg-mint rounded-xl p-5 flex justify-center items-center'>
          <p className='text-cloud font-semibold'>없음</p>
        </div>
      )}
    </div>
  );
}
