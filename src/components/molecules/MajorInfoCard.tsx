'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import RecommendSubjectSlide from './RecommendSubjectSlide';

interface MajorInfoCardProps {
  major: {
    majorId: number;
    majorName: string;
    description: string;
    recommendedCourses: string;
  };
}

export default function MajorInfoCard({ major }: MajorInfoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button
        className='w-full rounded-xl bg-mint p-5 flex flex-col items-center justify-center cursor-pointer relative z-10 shadow-md'
        onClick={toggleOpen}
      >
        <div className='flex items-center justify-center w-full'>
          <h1 className='text-xl font-semibold text-cloud'>
            {major.majorName}
          </h1>
        </div>
        <div className='border-b border-cloud w-20 mt-3 mb-4' />
        <p className='text-xs font-regular text-cloud'>{major.description}</p>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='w-full rounded-b-xl bg-cloud p-5 shadow-md absolute left-0 right-0 '
            initial={{
              opacity: 0,
              top: 0,
              height: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            animate={{
              opacity: 1,
              top: '95%',
              height: 'auto',
              paddingTop: 20,
              paddingBottom: 20,
            }}
            exit={{
              opacity: 0,
              top: 0,
              height: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className='text-sm font-bold mb-1 text-center'>
                핵심 권장 과목
              </h2>
              <Link href='/roadmap'>
                <p className='text-right text-[.5rem] font-regular text-grey mb-1'>
                  {'자세히보기 >'}
                </p>
              </Link>
              <RecommendSubjectSlide subjects={major.recommendedCourses} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
