import DropdownForm from '@/components/organisms/DropdownForm';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const DropdownFormWithState = () => {
  const [value, setValue] = useState('');

  return (
    <DropdownForm
      title='옵션선택'
      options={['옵션 1', '옵션 2', '옵션 3']}
      placeholder='옵션을 선택하세요'
      value={value}
      onChange={setValue}
    />
  );
};

const meta = {
  title: 'Organisms/DropdownForm',
  component: DropdownFormWithState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '0 0 250px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownFormWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomOptions: Story = {
  args: {
    options: ['커스텀 1', '커스텀 2', '커스텀 3'],
    placeholder: '커스텀 옵션을 선택하세요',
  },
};
