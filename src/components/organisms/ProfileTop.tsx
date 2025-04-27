import Image from 'next/image';

interface ProfileTopProps {
  name: string;
  image: string;
}

export default function ProfileTop({ name, image }: ProfileTopProps) {
  return (
    <>
      <h1 className='text-[1.75rem] font-semibold pt-6 text-cloud'>{name}</h1>
      <div className='relative py-4 h-40 w-full'>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cloud rounded-full shadow-lg p-4'>
          <Image src={image} alt='profile' width={80} height={80} />
        </div>
      </div>
    </>
  );
}
