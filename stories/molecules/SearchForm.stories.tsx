import SearchForm from '@/components/molecules/SearchForm';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

const SearchFormWithState = ({
  initialValue = '',
  placeholder = '검색어를 입력하세요',
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SearchForm
      value={value}
      onChange={setValue}
      onSearch={() => console.log('Searching for:', value)}
      placeholder={placeholder}
    />
  );
};

const meta = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
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
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Default: Story = () => <SearchFormWithState />;

export const WithValue: Story = () => (
  <SearchFormWithState initialValue='React' />
);

export const CustomPlaceholder: Story = () => (
  <SearchFormWithState placeholder='과목명을 입력하세요' />
);
