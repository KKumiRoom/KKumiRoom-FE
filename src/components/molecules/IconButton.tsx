import Icon from '@/components/atoms/Icon';
import { ReactElement } from 'react';
import Button, { ButtonProps } from '../atoms/Button';

interface IconButtonProps extends Omit<ButtonProps, 'children' | 'size' | 'text'> {
  children: ReactElement<{ className?: string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
}

const IconButton = ({
  children,
  size = 'lg',
  text,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Button variant='ghost' size='fit' className={`flex flex-col items-center ${className}`} {...props}>
      <Icon size={size}>{children}</Icon>
      {text && <p className='text-[.625rem] font-bold'>{text}</p>}
    </Button>
  );
};

export default IconButton;
