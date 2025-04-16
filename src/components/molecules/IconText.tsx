import { ReactElement, JSXElementConstructor } from 'react';
import Icon from '../atoms/Icon';

interface IconTextProps {
  /**
   * 표시할 아이콘 요소 (React Element)
   */
  icon: ReactElement<
    { className?: string },
    string | JSXElementConstructor<unknown>
  >;

  /**
   * 표시할 텍스트
   */
  text: string;

  /**
   * 추가 클래스명
   */
  className?: string;
}

/**
 * 아이콘과 텍스트를 함께 표시하는 컴포넌트
 */
function IconText({ icon, text, className = '' }: IconTextProps) {
  return (
    <div className={`flex flex-row gap-2 items-center ${className}`}>
      <Icon>{icon}</Icon>
      <p>{text}</p>
    </div>
  );
}

export default IconText;
