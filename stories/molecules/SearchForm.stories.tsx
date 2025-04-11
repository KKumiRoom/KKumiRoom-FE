import type { Meta, StoryObj } from '@storybook/react';
import SearchForm from '@/components/molecules/SearchForm';
import { useState } from 'react';

const SearchFormWithState = () => {
  const [value, setValue] = useState('');
  
  return (
    <SearchForm
      value={value}
      onChange={setValue}
      onSearch={() => {}}
      placeholder="검색어를 입력하세요"
    />
  );
};

const meta = {
  title: 'Molecules/SearchForm',
  component: SearchFormWithState,
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
} satisfies Meta<typeof SearchFormWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '과목명을 입력하세요',
  },
}; 