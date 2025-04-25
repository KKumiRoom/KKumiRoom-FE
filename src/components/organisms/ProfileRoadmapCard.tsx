import LinkCard from '../molecules/LinkCard';

export default function ProfileRoadmapCard({ major }: { major: string }) {
  if (major === '') {
    return (
      <LinkCard
        image='/images/cardImage/think.png'
        title='나의 진로 찾기'
        description='꾸미룸과 함께 나의 진로를 찾아봐요.'
        href='/roadmap'
        className='bg-[#D2DAE0]'
      />
    );
  }

  return (
    <LinkCard
      image='/images/cardImage/think.png'
      title={`${major}에 가려면?`}
      description={`${major}에 가기위해 들어야할 수업에 대해 알아봐요.`}
      href='/roadmap/software-engineering'
      className='bg-[#D2DAE0]'
    />
  );
}
