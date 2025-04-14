import SubjectInfoCard from '@/components/molecules/SubjectInfoCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/SubjectInfoCard',
  component: SubjectInfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '560px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SubjectInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommonSubject: Story = {
  args: {
    title: '공통 수학 I',
    type: '공통',
    code: 'MATH101',
  },
};

export const ElectiveSubject: Story = {
  args: {
    title: '지구과학 II',
    type: '선택',
    code: 'ESCI202',
  },
};
