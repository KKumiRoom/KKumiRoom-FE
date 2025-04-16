import ProfileCard from '@/components/molecules/ProfileCard';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Molecules/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    profileImage: { control: 'text' },
    name: { control: 'text' },
    schoolInfo: { control: 'text' },
    birthDate: { control: 'text' },
    phoneNumber: { control: 'text' },
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '홍길동',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    schoolInfo: '서울대학교 컴퓨터공학과',
    birthDate: '2000년 1월 1일',
    phoneNumber: '010-1234-5678',
  },
};

export const WithoutProfileImage: Story = {
  args: {
    name: '김철수',
    profileImage: '',
    schoolInfo: '한양대학교 경영학과',
    birthDate: '1999년 3월 15일',
    phoneNumber: '010-9876-5432',
  },
};

export const LongInformation: Story = {
  args: {
    name: '김길동의 매우 긴 이름 표시 테스트',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    schoolInfo: '서울대학교 컴퓨터공학과 인공지능 전공',
    birthDate: '2000년 1월 1일 (24세)',
    phoneNumber: '010-1234-5678 (모바일)',
  },
};

// 데코레이터로 크기 제한해서 보여주기
export const WithSizeConstraint: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    name: '박지민',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    schoolInfo: '고려대학교 심리학과',
    birthDate: '2002년 5월 20일',
    phoneNumber: '010-2222-3333',
  },
};
