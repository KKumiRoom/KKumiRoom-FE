interface BadgeProps {
  text: string;
  variant?:
    | 'mint'
    | 'cloud'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'gray'
    | 'selected'
    | 'previous'
    | 'next';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeSize = {
  xs: 'px-1 text-[10px] h-fit',
  sm: 'px-2 py-1 text-xs h-fit',
  md: 'px-3 py-2 text-sm h-fit',
  lg: 'px-4 py-3 text-base h-fit',
};

const badgeVariant = {
  mint: 'bg-mint text-cloud',
  cloud: 'bg-cloud',
  primary: 'bg-primary text-cloud',
  secondary: 'bg-secondary text-cloud',
  tertiary: 'bg-tertiary text-cloud',
  gray: 'bg-gray-400 text-cloud',
  selected: 'bg-linear-60 from-[#C2C2C2] to-[#5C5C5C] text-cloud',
  previous: 'bg-[#C2C2C2] text-cloud',
  next: 'bg-[#5C5C5C] text-cloud',
};

export default function Badge({
  text,
  variant = 'cloud',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center self-center ${badgeVariant[variant]} rounded-full ${badgeSize[size]} font-semibold ${className}`}
    >
      {text}
    </div>
  );
}
