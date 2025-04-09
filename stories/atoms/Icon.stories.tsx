import type { Meta, StoryObj } from '@storybook/react';
import Icon from '@/components/atoms/Icon';
import { FaX } from 'react-icons/fa6';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
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
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'cloud', 'foreground', 'current'],
      description: '아이콘의 색상을 설정합니다.',
    },
  },
} satisfies Meta<typeof Icon>;

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

export const Primary: Story = {
  args: {
    size: 'md',
    color: 'primary',
    children: <FaX />,
  },
};

export const Secondary: Story = {
  args: {
    size: 'md',
    color: 'secondary',
    children: <FaX />,
  },
};

export const Tertiary: Story = {
  args: {
    size: 'md',
    color: 'tertiary',
    children: <FaX />,
  },
};


export const Foreground: Story = {
  args: {
    size: 'md',
    color: 'foreground',
    children: <FaX />,
  },
}; 