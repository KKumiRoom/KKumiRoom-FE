interface DropdownListProps {
  options: string[];
  onSelect: (option: string) => void;
  isOpen: boolean;
}

const DropdownList = ({ options, onSelect, isOpen }: DropdownListProps) => {
  if (!isOpen) return null;

  return (
    <ul className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-[12.5rem] overflow-y-auto">
      {options.map((option) => (
        <li
          key={option}
          onClick={() => onSelect(option)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList; 