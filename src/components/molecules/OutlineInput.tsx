import { forwardRef, ReactElement, InputHTMLAttributes } from 'react';
import Icon from '../atoms/Icon';

type OutlineInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  label?: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: ReactElement<{ className?: string }>;
  iconButton?: ReactElement<{ className?: string }>;
  error?: boolean;
  errorMessage?: string;
};

const OutlineInput = forwardRef<HTMLInputElement, OutlineInputProps>(
  (props, ref) => {
    const {
      // 커스텀 props
      label,
      onChange,
      className = '',
      icon,
      iconButton,
      error = false,
      errorMessage,
      // HTML input props
      type = 'text',
      value,
      placeholder,
      disabled = false,
      required = false,
      id,
      name,
      // ARIA props
      'aria-label': ariaLabel,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedby,
      // 이벤트 핸들러
      onBlur,
      onFocus,
      onKeyDown,
      // 나머지 props
      ...restProps
    } = props;

    const inputId = id || `input-${name || label}`;
    const errorId = errorMessage ? `${inputId}-error` : undefined;

    const inputWrapperClassName = `
      border rounded-lg px-2 py-1 bg-cloud min-h-[3.5rem] 
      flex justify-between items-center w-full gap-4
      ${error ? 'border-warning' : 'border-grey/50'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `.trim();

    const inputProps = {
      ref,
      id: inputId,
      name,
      type,
      value,
      placeholder,
      disabled,
      required,
      'aria-label': ariaLabel,
      'aria-invalid': error || ariaInvalid,
      'aria-describedby': errorId || ariaDescribedby,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value),
      onBlur,
      onFocus,
      onKeyDown,
      className: 'w-full focus:outline-none bg-transparent',
      ...restProps,
    };

    return (
      <div className='flex flex-col gap-2'>
        {label && (
          <label htmlFor={inputId} className='text-lg'>
            {label}
            {required && <span className='text-warning ml-1'>*</span>}
          </label>
        )}
        <div className={inputWrapperClassName}>
          {icon && <Icon size='sm'>{icon}</Icon>}
          <input {...inputProps} />
          {iconButton && iconButton}
        </div>
        {error && errorMessage && (
          <p id={errorId} className='text-warning text-sm' role='alert'>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

OutlineInput.displayName = 'OutlineInput';

export default OutlineInput;
