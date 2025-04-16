import LinkCard from '@/components/molecules/LinkCard';
import ProfileCard from '@/components/molecules/ProfileCard';

const profileInfo = {
  name: '김철수',
  profileImage: '/images/DefaultProfile.png',
  schoolInfo: '대인고등학교 3학년 8반',
  birthDate: '1990-01-01',
  phoneNumber: '010-1234-5678',
  major: '소프트웨어공학과',
};

const ProfilePage = () => {
  return (
    <div className='flex flex-col gap-4 py-3'>
      <ProfileCard {...profileInfo} />
      {profileInfo.major == '' ? (
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
