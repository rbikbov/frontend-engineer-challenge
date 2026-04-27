import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondaryMain',
        'secondarySecondary',
        'tertiaryPrimary',
        'tertiarySecondary',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'text', 'other'],
    },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const defaultArgs = {
  children: 'Кнопка',
};

export const Primary: Story = {
  args: {
    ...defaultArgs,
    variant: 'primary',
    className: 'w-[240px]',
  },
};

export const SecondaryMain: Story = {
  args: {
    ...defaultArgs,
    variant: 'secondaryMain',
    className: 'w-[240px]',
  },
};

export const SecondarySecondary: Story = {
  args: {
    ...defaultArgs,
    variant: 'secondarySecondary',
    className: 'w-[240px]',
  },
};

export const TertiaryPrimary: Story = {
  args: {
    ...defaultArgs,
    variant: 'tertiaryPrimary',
    size: 'text',
  },
};

export const TertiarySecondary: Story = {
  args: {
    ...defaultArgs,
    variant: 'tertiarySecondary',
    size: 'text',
  },
};

export const Link: Story = {
  args: {
    ...defaultArgs,
    variant: 'link',
    size: 'text',
  },
};
