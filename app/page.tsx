import Icon from '@/components/atoms/Icon';
import { FaArrowLeft } from 'react-icons/fa';
import { FaBell, FaUser, FaX } from 'react-icons/fa6';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Icon size="sm">
        <FaArrowLeft />
      </Icon>
      <Icon size="lg">
        <FaX />
      </Icon>
      <Icon size="xl">
        <FaUser />
      </Icon>
      <Icon size="xl">
        <FaBell />
      </Icon>
    </div>
  );
}
