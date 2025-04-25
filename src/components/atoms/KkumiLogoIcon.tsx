'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface KkumiLogoIconProps {
  width?: number;
  height?: number;
  fill?: string;
  autoPlay?: boolean;
  className?: string;
}

const KkumiLogoIcon = ({
  width = 200,
  height = 200,
  fill = '#61B89F',
  autoPlay = true,
  className,
}: KkumiLogoIconProps) => {
  // 한글 자음(ㄲ, ㅁ, ㄹ) 애니메이션을 위한 variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 1,
      fill: 'rgba(97, 184, 159, 0)',
      stroke: fill,
      strokeWidth: 2,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      fill,
      stroke: fill,
      strokeWidth: 2,
    },
  };

  // 눈 애니메이션을 위한 variants
  const eyeVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  // 입 애니메이션을 위한 variants
  const mouthVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
    },
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox='0 0 308 261'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* ㄲ 모양 */}
      <motion.path
        d='M84.6445 96.1953H66.6758V19.2422H22.7305V4.10547H84.6445V96.1953ZM154.859 96.0977H136.695V18.8516H94.4102V3.71484H154.859V96.0977Z'
        variants={pathVariants}
        initial='hidden'
        animate={autoPlay ? 'visible' : 'hidden'}
        transition={{
          default: { duration: 1, ease: 'easeInOut' },
          fill: { duration: 0.5, delay: 0.6 },
        }}
      />

      {/* ㅁ 모양 */}
      <motion.path
        d='M166.773 187.414H55.9336V95.6172H166.773V187.414ZM74.4883 172.473H147.926V110.754H74.4883V172.473Z'
        variants={pathVariants}
        initial='hidden'
        animate={autoPlay ? 'visible' : 'hidden'}
        transition={{
          default: { duration: 1, ease: 'easeInOut' },
          fill: { duration: 0.5, delay: 0.6 },
        }}
      />

      {/* ㄹ 모양 */}
      <motion.path
        d='M276.773 200.059H183.609V234.336H166.129V185.312H258.902V160.117H165.641V145.273H276.773V200.059ZM279.605 240.977H166.129V225.84H279.605V240.977Z'
        variants={pathVariants}
        initial='hidden'
        animate={autoPlay ? 'visible' : 'hidden'}
        transition={{
          default: { duration: 1, ease: 'easeInOut' },
          fill: { duration: 0.5, delay: 0.6 },
        }}
      />

      {/* 눈 */}
      <motion.circle
        cx='90'
        cy='136'
        r='5'
        fill={fill}
        variants={eyeVariants}
        initial='hidden'
        animate={autoPlay ? 'visible' : 'hidden'}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay: 1.1,
        }}
      />
      <motion.circle
        cx='115'
        cy='136'
        r='5'
        fill={fill}
        variants={eyeVariants}
        initial='hidden'
        animate={autoPlay ? 'visible' : 'hidden'}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay: 1.1,
        }}
      />

      {/* 입 */}
      <motion.path
        d='M118.5 157C118.5 157.391 118.313 157.936 117.626 158.6C116.933 159.269 115.834 159.951 114.317 160.557C112.813 161.159 110.992 161.649 108.952 161.987C106.915 162.325 104.721 162.5 102.5 162.5C100.279 162.5 98.0851 162.325 96.0482 161.987C94.0085 161.649 92.1874 161.159 90.6827 160.557C89.1664 159.951 88.0673 159.269 87.3741 158.6C86.6869 157.936 86.5 157.391 86.5 157'
        fill='none'
        stroke={fill}
        strokeWidth='5'
        variants={mouthVariants}
        initial='hidden'
        animate={autoPlay ? 'visible' : 'hidden'}
        transition={{
          pathLength: { duration: 0.8, ease: 'easeOut', delay: 1.8 },
          opacity: { duration: 0.3, delay: 1.8 },
        }}
      />
    </motion.svg>
  );
};

export default KkumiLogoIcon;
