import Image from 'next/image';
import { CSSProperties } from 'react';

interface CircleImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

/**
 * 원형 이미지 컴포넌트
 *
 * @param src - 이미지 경로
 * @param alt - 대체 텍스트
 * @param size - 이미지 크기 (픽셀 단위, 기본값: 40)
 * @param className - 추가 스타일 클래스
 */
function CircleImage({
  src,
  alt,
  size = 40,
  className = '',
}: CircleImageProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className='object-cover'
        priority
      />
    </div>
  );
}

export default CircleImage;
