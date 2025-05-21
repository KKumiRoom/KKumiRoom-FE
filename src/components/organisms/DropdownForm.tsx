import DropdownList from '@/components/atoms/DropdownList';
import IconButton from '@/components/molecules/IconButton';
import TitleInputWithButton from '@/components/molecules/TitleInputWithButton';
import { FaAngleDown } from 'react-icons/fa6';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface Option {
  id: number;
  name: string;
}

type DropdownVariant = 'default' | 'outline';

interface DropdownFormProps {
  title?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
  variant?: DropdownVariant;
}

const DropdownForm = ({
  title = '',
  value,
  onChange,
  placeholder,
  options,
  className = '',
  disabled = false,
  variant = 'default',
}: DropdownFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === value) || null,
    [options, value]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  const handleSelect = useCallback(
    (option: Option) => {
      onChange(option.id);
      setIsOpen(false);
    },
    [onChange]
  );

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return `
          border rounded-lg px-2 py-1 bg-cloud min-h-[3.5rem] 
          flex justify-between items-center w-full gap-4
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isOpen ? 'border-primary' : 'border-grey/50'}
        `;
      default:
        return '';
    }
  };

  return (
    <div
      ref={containerRef}
      role='combobox'
      aria-expanded={isOpen}
      aria-haspopup='listbox'
      className={variant === 'outline' ? getVariantStyles() : className}
    >
      {variant === 'outline' ? (
        <div className='relative w-full'>
          <div className='flex items-center justify-between w-full'>
            <input
              type='text'
              value={selectedOption ? selectedOption.name : ''}
              placeholder={placeholder}
              disabled
              className='w-full focus:outline-none bg-transparent'
              readOnly
            />
            <IconButton
              onClick={toggleDropdown}
              size='md'
              disabled={disabled}
              type='button'
              className={`mr-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-label='드롭다운 토글'
            >
              <FaAngleDown />
            </IconButton>
          </div>
          <DropdownList
            options={options}
            onSelect={handleSelect}
            isOpen={isOpen}
            selectedOption={value}
          />
        </div>
      ) : (
        <TitleInputWithButton
          title={title}
          value={selectedOption ? selectedOption.name : ''}
          onChange={() => {}}
          placeholder={placeholder}
          className={`focus:outline-none ${className}`}
          disabled
          button={
            <IconButton
              onClick={toggleDropdown}
              size='md'
              disabled={disabled}
              type='button'
              className={`mr-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-label='드롭다운 토글'
            >
              <FaAngleDown />
            </IconButton>
          }
        >
          <DropdownList
            options={options}
            onSelect={handleSelect}
            isOpen={isOpen}
            selectedOption={value}
          />
        </TitleInputWithButton>
      )}
    </div>
  );
};

export default DropdownForm;
