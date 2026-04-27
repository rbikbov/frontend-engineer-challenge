import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from './logo';

const meta: Meta<typeof Logo> = {
  title: 'Branding/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    width: 200,
    height: 40,
  },
};

export const Large: Story = {
  args: {
    width: 400,
    height: 80,
  },
};
