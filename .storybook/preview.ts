import type { Preview } from '@storybook/react';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'inner-background',
      values: [
        { name: 'outer-background', value: '#000000' },
        { name: 'inner-background', value: '#F8F8F8' },
      ],
    },
  },
};

export default preview;
