import LinkCard from '../molecules/LinkCard';

interface ProfileRoadmapCardProps {
  majorId: number;
  majorName: string;
}

export default function ProfileRoadmapCard({
  majorId,
  majorName,
}: ProfileRoadmapCardProps) {
  if (majorId === 0) {
    return (
      <LinkCard
        image='/images/cardImage/location.png'
        title='원하는 학과를 선택해 주세요'
        description='꾸미룸에서 원하는 학과에 가기 위해 필요한 수업을 안내해줄게요!'
        href='/roadmap'
        className='bg-cloud'
      />
    );
  }

  return (
    <LinkCard
      image='/images/cardImage/think.png'
      title={`${majorName}에 가려면?`}
      description={`${majorName}에 가기위해 들어야할 수업에 대해 알아봐요.`}
      href='/roadmap'
      className='bg-cloud'
    />
  );
}
