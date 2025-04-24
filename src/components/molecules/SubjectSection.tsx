import { IconType } from 'react-icons';

type Variant = 'primary' | 'lemon' | 'confirm';

interface SubjectSectionProps {
  title: string;
  content: string;
  icon: IconType;
  variant: Variant;
}

const variantStyles = {
  primary: {
    container: 'bg-primary/20',
    badge: 'bg-primary',
  },
  lemon: {
    container: 'bg-lemon/20',
    badge: 'bg-lemon',
  },
  confirm: {
    container: 'bg-confirm/20',
    badge: 'bg-confirm',
  },
} as const;

const SubjectSection = ({
  title,
  content,
  icon: Icon,
  variant,
}: SubjectSectionProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={`relative pt-4 ${styles.container} rounded-2xl rounded-tl-none min-h-[88px]`}
    >
      <div className='absolute -top-3 left-0'>
        <div
          className={`flex items-center gap-2 px-4 rounded-full h-[24px] ${styles.badge}`}
        >
          <Icon size={12} className='text-cloud' />
          <span className='text-cloud font-semibold text-xs'>{title}</span>
        </div>
      </div>
      <p className='px-6 pb-2 text-sm'>{content}</p>
    </div>
  );
};

export default SubjectSection;
