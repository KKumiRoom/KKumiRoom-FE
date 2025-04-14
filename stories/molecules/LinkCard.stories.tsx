import LinkCard from '@/components/molecules/LinkCard';
import type { Meta, StoryObj } from '@storybook/react';
import { FaQuestion, FaBook } from 'react-icons/fa6';

const meta = {
  title: 'Molecules/LinkCard',
  component: LinkCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    image: '/images/cardImage/think.png',
    title: '나의 진로 찾기',
    description: '꾸미룸과 함께 나의 꿈을 찾아봐요!',
    href: '/',
  },
};

export const Border: Story = {
  args: {
    image: '/images/cardImage/think.png',
    title: '나의 진로 찾기',
    description: '꾸미룸과 함께 나의 꿈을 찾아봐요!',
    href: '/',
    className: 'border border-grey',
  },
};

export const WithCustonClass: Story = {
  args: {
    image: '/images/cardImage/book.png',
    title: '소방관이 되려면?',
    description: '소방관이 되기 위해 들어야할 과목에 대해 알아봐요!',
    href: '/library/firefighter',
    className: 'bg-[#D2DAE0]',
  },
};
