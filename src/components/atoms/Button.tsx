import { twMerge } from 'tailwind-merge';
import React from 'react';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'fit';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  fit: 'p-1',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-cloud hover:bg-primary/90',
  secondary: 'bg-secondary text-cloud hover:bg-secondary/90',
  tertiary: 'bg-tertiary text-cloud hover:bg-tertiary/90',
  ghost: 'bg-transparent text-foreground',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      size = 'md',
      variant = 'ghost',
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none  disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer';
    const widthStyles = fullWidth ? 'w-full' : '';

    const buttonStyles = twMerge(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      widthStyles,
      className
    );

    return (
      <button
        type={props.type as ButtonType}
        className={buttonStyles}
        disabled={disabled}
        ref={ref as React.RefObject<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
