import Input from '@/components/atoms/Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: (value) => console.log(value),
    placeholder: '입력하세요',
  },
};
