import { useState, useEffect, useRef, useCallback } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import IconButton from '@/components/molecules/IconButton';
import TitleInputWithButton from '@/components/molecules/TitleInputWithButton';
import DropdownList from '@/components/atoms/DropdownList';

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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const handleSelect = useCallback((option: string) => {
    onChange(option);
    setIsOpen(false);
  }, [onChange]);

  return (
    <div ref={containerRef}>
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
          >
            <FaAngleDown />
          </IconButton>
        }
      >
        <DropdownList
          options={options}
          onSelect={handleSelect}
          isOpen={isOpen}
        />
      </TitleInputWithButton>
    </div>
  );
};

export default DropdownForm; 