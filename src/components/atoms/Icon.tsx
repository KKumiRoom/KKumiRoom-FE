import { twMerge } from 'tailwind-merge';
import { ReactElement, cloneElement } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'foreground'
  | 'current';

export interface IconProps {
  children: ReactElement<{ className?: string }>;
  size?: IconSize;
  color?: IconColor;
  className?: string;
}

const sizeStyles: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const colorStyles: Record<IconColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  foreground: 'text-foreground',
  current: 'text-current',
};

const Icon = ({
  children,
  size = 'md',
  color = 'current',
  className,
}: IconProps) => {
  const icon = cloneElement(children, {
    className: twMerge(sizeStyles[size], colorStyles[color], className),
  });

  return icon;
};

export default Icon;
