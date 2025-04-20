interface Option {
  id: number;
  name: string;
}

interface DropdownListProps {
  options: Option[];
  onSelect: (option: Option) => void;
  isOpen: boolean;
  selectedOption?: number;
}

const DropdownList = ({
  options,
  onSelect,
  isOpen,
  selectedOption,
}: DropdownListProps) => {
  if (!isOpen) return null;

  return (
    <ul
      className='absolute left-0 right-0 top-full mt-1 bg-cloud border rounded-lg shadow-lg z-10 max-h-[12.5rem] overflow-y-auto'
      role='listbox'
    >
      {options.map((option) => (
        <li
          key={option.id}
          onClick={() => onSelect(option)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelect(option);
            }
          }}
          className='px-4 py-2 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg'
          role='option'
          tabIndex={0}
          aria-selected={selectedOption === option.id}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
