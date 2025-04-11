import { forwardRef, KeyboardEvent } from 'react';

interface InputProps {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, value, onChange, placeholder, className = '', onKeyDown }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`w-full px-2 py-1 focus:outline-none ${className}`}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
