import Image from 'next/image';
import localFont from 'next/font/local';

// 로컬 폰트 설정
const paperlogy = localFont({
  src: [
    {
      path: '../../../public/fonts/Paperlogy/Paperlogy-6SemiBold.ttf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../../../public/fonts/Paperlogy/Paperlogy-5Medium.ttf',
      weight: '500',
      style: 'medium',
    },
  ],
  variable: '--font-paperlogy',
});

export default function MainAdCard() {
  return (
    <div
      className={`flex justify-between w-full bg-cloud rounded-xl px-4 py-2 text-main shadow-md ${paperlogy.className}`}
    >
      <div className='flex flex-col gap-1 p-1'>
        <p className='text-lg font-semibold'>수업, 꾸미룸에서 다 관리</p>
        <p className='text-sm font-medium'>
          나의 꿈을 이루기 위한 준비, <br />
          꾸미룸이 함께해요!
        </p>
      </div>
      <div>
        <Image
          src='/images/cardImage/Books.png'
          alt='main-ad-card'
          width={120}
          height={80}
          priority
        />
      </div>
    </div>
  );
}
