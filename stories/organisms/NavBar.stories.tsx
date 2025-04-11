import type { Meta, StoryObj } from '@storybook/react';
import NavBar from '@/components/organisms/NavBar';
import { PAGE } from '@/constants/navigation';

const meta = {
  title: 'Organisms/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeActive: Story = {
  args: {
    activePage: PAGE.HOME,
    onNavigate: (page) => console.log(`Navigating to ${page}`),
  },
};

export const TimetableActive: Story = {
  args: {
    activePage: PAGE.TIMETABLE,
    onNavigate: (page) => console.log(`Navigating to ${page}`),
  },
};

export const SubjectActive: Story = {
  args: {
    activePage: PAGE.SUBJECT,
    onNavigate: (page) => console.log(`Navigating to ${page}`),
  },
};

export const RoadmapActive: Story = {
  args: {
    activePage: PAGE.ROADMAP,
    onNavigate: (page) => console.log(`Navigating to ${page}`),
  },
}; 