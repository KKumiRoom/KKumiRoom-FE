import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BottomSheetProps {
  children: ReactNode;
  className?: string;
}

export default function BottomSheet({
  children,
  className = '',
}: BottomSheetProps) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 200,
        mass: 1,
      }}
      className={`fixed bottom-0 left-0 right-0 bg-cloud rounded-t-[24px] ${className}`}
    >
      <div className='w-[90%] mx-auto'>{children}</div>
    </motion.div>
  );
}
