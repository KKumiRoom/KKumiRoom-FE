import type { Meta, StoryObj } from '@storybook/react';
import DropdownForm from '@/components/organisms/DropdownForm';

const meta = {
  title: 'Organisms/DropdownForm',
  component: DropdownForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '80px 0'}}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '학교 찾기',
    value: '',
    onChange: (value) => console.log('Selected:', value),
    placeholder: '학교를 선택해주세요',
    options: ['서울대학교', '연세대학교', '고려대학교'],
  },
};

export const WithValue: Story = {
  args: {
    title: '학교 찾기',
    value: '서울대학교',
    onChange: (value) => console.log('Selected:', value),
    placeholder: '학교를 선택해주세요',
    options: ['서울대학교', '연세대학교', '고려대학교'],
  },
};

export const ManyOptions: Story = {
  args: {
    title: '학교 찾기',
    value: '',
    onChange: (value) => console.log('Selected:', value),
    placeholder: '학교를 선택해주세요',
    options: [
      '서울대학교',
      '연세대학교',
      '고려대학교',
      '서강대학교',
      '성균관대학교',
      '한양대학교',
      '중앙대학교',
      '경희대학교',
    ],
  },
}; 