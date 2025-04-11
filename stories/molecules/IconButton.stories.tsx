import IconButton from '@/components/molecules/IconButton';
import type { Meta, StoryObj } from '@storybook/react';
import { FaX } from 'react-icons/fa6';

const meta = {
  title: 'Molecules/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '아이콘의 크기를 설정합니다.',
    },
    disabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태를 설정합니다.',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const XS: Story = {
  args: {
    size: 'xs',
    children: <FaX />,
  },
};

export const SM: Story = {
  args: {
    size: 'sm',
    children: <FaX />,
  },
};

export const MD: Story = {
  args: {
    size: 'md',
    children: <FaX />,
  },
};

export const LG: Story = {
  args: {
    size: 'lg',
    children: <FaX />,
  },
};

export const XL: Story = {
  args: {
    size: 'xl',
    children: <FaX />,
  },
};

export const Text: Story = {
  args: {
    size: 'md',
    text: '취소',
    children: <FaX />,
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    disabled: true,
    children: <FaX />,
  },
};
