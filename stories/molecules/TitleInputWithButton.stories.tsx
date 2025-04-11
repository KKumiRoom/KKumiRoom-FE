import type { Meta, StoryObj } from '@storybook/react';
import TitleInputWithButton from '@/components/molecules/TitleInputWithButton';
import { FaPlus } from 'react-icons/fa6';
import IconButton from '@/components/molecules/IconButton';
import { FaSearch } from 'react-icons/fa';

const meta = {
  title: 'Molecules/TitleInputWithButton',
  component: TitleInputWithButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TitleInputWithButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSearchButton: Story = {
  args: {
    title: '검색',
    value: '',
    onChange: (value) => console.log('Changed:', value),
    placeholder: '검색어를 입력하세요',
    button: (
      <IconButton onClick={() => console.log('Search clicked')} size='md' className='mr-2'>
        <FaSearch />
      </IconButton>
    ),
  },
};

export const WithPlusButton: Story = {
  args: {
    title: '추가',
    value: '',
    onChange: (value) => console.log('Changed:', value),
    placeholder: '항목을 입력하세요',
    button: (
      <IconButton onClick={() => console.log('Plus clicked')} size='md' className='mr-2'>
        <FaPlus />
      </IconButton>
    ),
  },
}; 