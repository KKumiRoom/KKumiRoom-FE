import Input from '@/components/atoms/Input';

interface TitleInputProps {
  title: string;
  value?: string;
  type?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TitleInput = ({
  title,
  value,
  type = 'text',
  onChange,
  placeholder,
  className = '',
}: TitleInputProps) => {
  const inputId = `${title.replace(/\s+/g, '-').toLowerCase()}-input`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={inputId} className='block text-lg font-bold mb-1'>
        {title}
      </label>
      <Input
        id={inputId}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full px-2 py-1 border-b focus:outline-none'
      />
    </div>
  );
};

export default TitleInput;
