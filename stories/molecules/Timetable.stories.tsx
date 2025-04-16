import Timetable from '@/components/organisms/Timetable';
import { TimetableData } from '@/types/timetable';
import { Meta, StoryObj } from '@storybook/react';

const sampleData: TimetableData = {
  월: {
    '1': { name: '국어', color: 'bg-red-100', type: '공통' },
    '2': { name: '수학', color: 'bg-blue-100', type: '공통' },
    '4': { name: '영어', color: 'bg-green-100', type: '공통' },
  },
  화: {
    '2': { name: '과학', color: 'bg-yellow-100', type: '공통' },
    '3': { name: '체육', color: 'bg-purple-100', type: '선택' },
    '5': { name: '음악', color: 'bg-pink-100', type: '선택' },
  },
  수: {
    '1': { name: '사회', color: 'bg-indigo-100', type: '공통' },
    '6': { name: '미술', color: 'bg-orange-100', type: '선택' },
  },
  목: {
    '3': { name: '국어', color: 'bg-red-100', type: '공통' },
    '4': { name: '수학', color: 'bg-blue-100', type: '공통' },
    '7': { name: '영어', color: 'bg-green-100', type: '공통' },
  },
  금: {
    '1': { name: '과학', color: 'bg-yellow-100', type: '공통' },
    '2': { name: '사회', color: 'bg-indigo-100', type: '공통' },
    '8': { name: '진로', color: 'bg-teal-100', type: '선택' },
  },
};

const emptyData: TimetableData = {
  월: {},
  화: {},
  수: {},
  목: {},
  금: {},
};

const meta = {
  title: 'Molecules/Timetable',
  component: Timetable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Timetable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    days: ['월', '화', '수', '목', '금'],
    periods: 8,
  },
};

export const Empty: Story = {
  args: {
    data: emptyData,
    days: ['월', '화', '수', '목', '금'],
    periods: 8,
  },
};

export const WeekendIncluded: Story = {
  args: {
    data: {
      ...sampleData,
      토: {
        '2': { name: '보충수업', color: 'bg-gray-100', type: '선택' },
      },
      일: {},
    },
    days: ['월', '화', '수', '목', '금', '토', '일'],
    periods: 8,
  },
};

export const FourPeriodsOnly: Story = {
  args: {
    data: sampleData,
    days: ['월', '화', '수', '목', '금'],
    periods: 4,
  },
};
