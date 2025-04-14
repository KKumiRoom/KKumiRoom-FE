import { forwardRef, KeyboardEvent } from 'react';

export interface InputProps {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      value,
      onChange,
      placeholder,
      className = '',
      onKeyDown,
      type = 'text',
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
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
