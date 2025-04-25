'use client';

import { motion, useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';

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
  // useAnimate 훅을 사용하여 각 경로에 대한 ref와 animate 함수를 생성합니다
  const [ggRef, animateGg] = useAnimate();
  const [boxRef, animateBox] = useAnimate();
  const [rRef, animateR] = useAnimate();
  const [eyesRef, animateEyes] = useAnimate();
  const [mouthRef, animateMouth] = useAnimate();

  useEffect(() => {
    if (autoPlay) {
      // ㄲ, ㅁ, ㄹ 애니메이션 모두 동시에 시작
      animateGg(
        ggRef.current,
        { pathLength: 1 },
        { duration: 1, ease: 'easeInOut' }
      );
      animateBox(
        boxRef.current,
        { pathLength: 1 },
        { duration: 1, ease: 'easeInOut' }
      );
      animateR(
        rRef.current,
        { pathLength: 1 },
        { duration: 1, ease: 'easeInOut' }
      );

      // 스트로크가 완료된 후 채우기 시작
      setTimeout(() => {
        // 모든 채우기 애니메이션 동시에 시작
        animateGg(
          ggRef.current,
          { fill, stroke: 'rgba(97, 184, 159, 0)' },
          { duration: 0.5 }
        );
        animateBox(
          boxRef.current,
          { fill, stroke: 'rgba(97, 184, 159, 0)' },
          { duration: 0.5 }
        );
        animateR(
          rRef.current,
          { fill, stroke: 'rgba(97, 184, 159, 0)' },
          { duration: 0.5 }
        );
      }, 1000);

      // 눈 애니메이션
      animateEyes(
        eyesRef.current,
        { scale: 1, opacity: 1 },
        { duration: 0.5, delay: 1.0 }
      );

      // 입 애니메이션
      animateMouth(
        mouthRef.current,
        { pathLength: 1, opacity: 1 },
        { duration: 0.8, delay: 1.5 }
      );
    }
  }, [
    animateGg,
    animateBox,
    animateR,
    animateEyes,
    animateMouth,
    ggRef,
    boxRef,
    rRef,
    eyesRef,
    mouthRef,
    autoPlay,
    fill,
  ]);

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
        ref={ggRef}
        d='M84.6445 96.1953H66.6758V19.2422H22.7305V4.10547H84.6445V96.1953ZM154.859 96.0977H136.695V18.8516H94.4102V3.71484H154.859V96.0977Z'
        initial={{
          pathLength: 0,
          fill: 'rgba(97, 184, 159, 0)',
          stroke: fill,
          strokeWidth: 2,
        }}
      />

      {/* ㅁ 모양 */}
      <motion.path
        ref={boxRef}
        d='M166.773 187.414H55.9336V95.6172H166.773V187.414ZM74.4883 172.473H147.926V110.754H74.4883V172.473Z'
        initial={{
          pathLength: 0,
          fill: 'rgba(97, 184, 159, 0)',
          stroke: fill,
          strokeWidth: 2,
        }}
      />

      {/* ㄹ 모양 */}
      <motion.path
        ref={rRef}
        d='M276.773 200.059H183.609V234.336H166.129V185.312H258.902V160.117H165.641V145.273H276.773V200.059ZM279.605 240.977H166.129V225.84H279.605V240.977Z'
        initial={{
          pathLength: 0,
          fill: 'rgba(97, 184, 159, 0)',
          stroke: fill,
          strokeWidth: 2,
        }}
      />

      {/* 눈 */}
      <motion.g ref={eyesRef} initial={{ scale: 0, opacity: 0 }}>
        <motion.circle cx='90' cy='136' r='5' fill={fill} />
        <motion.circle cx='115' cy='136' r='5' fill={fill} />
      </motion.g>

      {/* 입 */}
      <motion.path
        ref={mouthRef}
        d='M118.5 157C118.5 157.391 118.313 157.936 117.626 158.6C116.933 159.269 115.834 159.951 114.317 160.557C112.813 161.159 110.992 161.649 108.952 161.987C106.915 162.325 104.721 162.5 102.5 162.5C100.279 162.5 98.0851 162.325 96.0482 161.987C94.0085 161.649 92.1874 161.159 90.6827 160.557C89.1664 159.951 88.0673 159.269 87.3741 158.6C86.6869 157.936 86.5 157.391 86.5 157'
        fill='none'
        stroke={fill}
        strokeWidth='5'
        initial={{ pathLength: 0, opacity: 0 }}
      />
    </motion.svg>
  );
};

export default KkumiLogoIcon;
