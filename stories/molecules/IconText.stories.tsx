import IconText from '@/components/molecules/IconText';
import { Meta, StoryObj } from '@storybook/react';
import { FaHome, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const meta = {
  title: 'Molecules/IconText',
  component: IconText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['home', 'user', 'envelope', 'phone'],
      mapping: {
        home: <FaHome />,
        user: <FaUser />,
        envelope: <FaEnvelope />,
        phone: <FaPhone />,
      },
    },
  },
} satisfies Meta<typeof IconText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <FaHome />,
    text: '홈',
  },
};

export const WithUser: Story = {
  args: {
    icon: <FaUser />,
    text: '사용자',
  },
};

export const WithEmail: Story = {
  args: {
    icon: <FaEnvelope />,
    text: 'example@gmail.com',
  },
};

export const WithPhone: Story = {
  args: {
    icon: <FaPhone />,
    text: '010-1234-5678',
  },
};

export const WithCustomClass: Story = {
  args: {
    icon: <FaHome />,
    text: '커스텀 클래스',
    className: 'bg-primary/10 p-2 rounded-md text-primary',
  },
};
