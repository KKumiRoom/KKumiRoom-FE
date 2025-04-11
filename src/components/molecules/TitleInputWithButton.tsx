import Input from '@/components/atoms/Input';
import { ReactNode } from 'react';

interface TitleInputWithButtonProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  button: ReactNode;
  className?: string;
  children?: ReactNode;
}

const TitleInputWithButton = ({
  title,
  value,
  onChange,
  placeholder,
  button,
  className = '',
  children,
}: TitleInputWithButtonProps) => {
  const inputId = `${title.replace(/\s+/g, '-').toLowerCase()}-input`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={inputId} className='block text-lg font-bold mb-1'>
        {title}
      </label>
      <div className='relative'>
        <div className='flex justify-between border-b border-b-gray-500'>
          <Input
            id={inputId}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='w-full px-2 py-1'
          />
          {button}
        </div>
        {children}
      </div>
    </div>
  );
};

export default TitleInputWithButton;
