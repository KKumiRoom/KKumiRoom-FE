export default function GreetingText({ name }: { name: string }) {
  return (
    <div className='pl-3'>
      <span className='text-2xl font-semibold text-primary'>{name}</span>
      <span className='text-xl font-semibold'> 님, 안녕하세요!</span>
      <p className='pt-1'>오늘은 어떤 수업이 있나요?</p>
    </div>
  );
}
