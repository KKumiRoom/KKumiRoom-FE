import DropdownList from '@/components/atoms/DropdownList';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/DropdownList',
  component: DropdownList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '0 0 250px 0' }}>
        <div style={{ position: 'relative' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['옵션 1', '옵션 2', '옵션 3'],
    onSelect: (option) => console.log('Selected:', option),
    isOpen: true,
  },
};

export const LongOptions: Story = {
  args: {
    options: [
      '매우 긴 옵션 텍스트 1입니다',
      '매우 긴 옵션 텍스트 2입니다',
      '매우 긴 옵션 텍스트 3입니다',
    ],
    onSelect: (option) => console.log('Selected:', option),
    isOpen: true,
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      '옵션 1',
      '옵션 2',
      '옵션 3',
      '옵션 4',
      '옵션 5',
      '옵션 6',
      '옵션 7',
      '옵션 8',
      '옵션 9',
      '옵션 10',
    ],
    onSelect: (option) => console.log('Selected:', option),
    isOpen: true,
  },
};
