import type { Meta, StoryObj } from '@storybook/react';
import AppHeader from '@/components/containers/AppHeader';

const meta = {
  title: 'Containers/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showBackButton: false,
  },
};

export const WithBackButton: Story = {
  args: {
    showBackButton: true,
  },
}; 