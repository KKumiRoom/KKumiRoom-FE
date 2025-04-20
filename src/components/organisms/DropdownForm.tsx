import DropdownList from '@/components/atoms/DropdownList';
import IconButton from '@/components/molecules/IconButton';
import TitleInputWithButton from '@/components/molecules/TitleInputWithButton';
import { FaAngleDown } from 'react-icons/fa6';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Option {
  id: number;
  name: string;
}

interface DropdownFormProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
}

const DropdownForm = ({
  title,
  value,
  onChange,
  placeholder,
  options,
  className = '',
  disabled = false,
}: DropdownFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(() => {
    return options.find((option) => option.id === value) || null;
  });

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

  useEffect(() => {
    // 외부에서 value가 변경되면 selectedOption 업데이트
    const newSelectedOption =
      options.find((option) => option.id === value) || null;
    setSelectedOption(newSelectedOption);
  }, [value, options]);

  const toggleDropdown = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  const handleSelect = useCallback(
    (option: Option) => {
      setSelectedOption(option);
      onChange(option.id);
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
        value={selectedOption ? selectedOption.name : ''}
        onChange={() => {}} // 직접 수정은 불가능하게 설정
        placeholder={placeholder}
        className={className}
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
    </div>
  );
};

export default DropdownForm;
