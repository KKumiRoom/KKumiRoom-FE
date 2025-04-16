'use client';

import clsx from 'clsx';
import { FaX } from 'react-icons/fa6';
import { ReactNode, useEffect, useRef } from 'react';
import IconButton from './IconButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  headerClassName = 'bg-grey/10',
  className = '',
  size = 'md',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-2/3',
    md: 'w-3/4',
    lg: 'w-4/5',
    xl: 'w-[90%]',
    full: 'w-full',
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        ref={modalRef}
        className={clsx(
          'relative bg-cloud rounded-xl shadow-lg overflow-hidden',
          className,
          sizeClasses[size]
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        {title && (
          <div
            className={clsx(
              headerClassName,
              'p-4 flex items-center justify-between'
            )}
          >
            <h2 id='modal-title' className='text-xl font-bold'>
              {title}
            </h2>
            <IconButton onClick={onClose} size='sm'>
              <FaX />
            </IconButton>
          </div>
        )}

        <div className='p-4'>{children}</div>

        {footer && (
          <div className='bg-grey/10 p-3 flex justify-end'>{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
