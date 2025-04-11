import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/organisms/Header';
import { FaArrowLeft, FaArrowRight, FaUser } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftButton: {
      icon: <FaArrowLeft />,
      label: '뒤로',
      onClick: () => console.log('뒤로가기 클릭'),
    },
    rightButton: {
      icon: <FaHome />,
      label: '홈',
      onClick: () => console.log('홈 클릭'),
    },
  },
};

export const OnlyLeftButton: Story = {
  args: {
    leftButton: {
      icon: <FaArrowLeft />,
      label: '뒤로',
      onClick: () => console.log('뒤로가기 클릭'),
    },
  },
};

export const OnlyRightButton: Story = {
  args: {
    rightButton: {
      icon: <FaUser />,
      label: '프로필',
      onClick: () => console.log('프로필 클릭'),
    },
  },
};

export const WithLongLabels: Story = {
  args: {
    leftButton: {
      icon: <FaArrowLeft />,
      label: '이전 페이지로 돌아가기',
      onClick: () => console.log('뒤로가기 클릭'),
    },
    rightButton: {
      icon: <FaHome />,
      label: '메인 홈페이지로 이동',
      onClick: () => console.log('홈 클릭'),
    },
  },
};

export const WithCustomIcons: Story = {
  args: {
    leftButton: {
      icon: <FaArrowLeft />,
      label: '뒤로',
      onClick: () => console.log('뒤로가기 클릭'),
    },
    rightButton: {
      icon: <FaArrowRight />,
      label: '다음',
      onClick: () => console.log('다음 클릭'),
    },
  },
}; 