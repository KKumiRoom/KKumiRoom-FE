import DropdownList from '@/components/atoms/DropdownList';
import IconButton from '@/components/molecules/IconButton';
import TitleInputWithButton from '@/components/molecules/TitleInputWithButton';
import { FaAngleDown } from 'react-icons/fa6';
import { useState, useEffect, useRef, useCallback } from 'react';

interface DropdownFormProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
  className?: string;
}

const DropdownForm = ({
  title,
  value,
  onChange,
  placeholder,
  options,
  className = '',
}: DropdownFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div
      ref={containerRef}
      role='combobox'
      aria-expanded={isOpen}
      aria-haspopup='listbox'
    >
      <TitleInputWithButton
        title={title}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        button={
          <IconButton
            onClick={toggleDropdown}
            size='md'
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
    </div>
  );
};

export default DropdownForm;
