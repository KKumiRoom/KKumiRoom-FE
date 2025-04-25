import { BiSolidPencil } from 'react-icons/bi';
import { PiSignOutBold } from 'react-icons/pi';
import Image from 'next/image';
import IconButton from '../molecules/IconButton';

interface ProfileTopProps {
  name: string;
  image: string;
  onEditClick: () => void;
  onSignOut: () => void;
}

export default function ProfileTop({
  name,
  image,
  onEditClick,
  onSignOut,
}: ProfileTopProps) {
  return (
    <>
      <h1 className='text-3xl font-semibold pt-9 text-cloud'>{name}</h1>
      <div className='relative py-6 h-40 w-full'>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cloud rounded-full border border-grey'>
          <Image src={image} alt='profile' width={100} height={100} />
        </div>

        <div className='absolute right-2 top-1/2 transform -translate-y-10 flex gap-2'>
          <IconButton
            className='border-2 border-cloud text-cloud rounded-xl'
            size='md'
            onClick={onEditClick}
          >
            <BiSolidPencil />
          </IconButton>
          <IconButton
            className='border-2 border-cloud text-cloud rounded-xl'
            size='md'
            onClick={onSignOut}
          >
            <PiSignOutBold />
          </IconButton>
        </div>
      </div>
    </>
  );
}
