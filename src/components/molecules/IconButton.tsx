import Icon from '@/components/atoms/Icon';
import { ReactElement } from 'react';
import Button, { ButtonProps } from '../atoms/Button';

interface IconButtonProps extends Omit<ButtonProps, 'children' | 'size'> {
  children: ReactElement<{ className?: string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const IconButton = ({
  children,
  size = 'md',
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Button variant='ghost' size='fit' className={className} {...props}>
      <Icon size={size}>{children}</Icon>
    </Button>
  );
};

export default IconButton;
