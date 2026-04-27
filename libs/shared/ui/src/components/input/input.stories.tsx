import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { EyeClosedIcon, EyeIcon, SearchIcon } from '../icons';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Title',
    placeholder: 'Placeholder',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Title',
    defaultValue: 'Text',
  },
};

export const Error: Story = {
  args: {
    label: 'Title',
    defaultValue: 'Text',
    error: 'Текст ошибки',
  },
};

export const WithSearchIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftElement: <SearchIcon className="text-foreground-secondary size-5" />,
  },
};

// Пример с паролем на кастомных иконках из папки icons/
export const PasswordToggle: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = React.useState(false);

    return (
      <Input
        {...args}
        type={show ? 'text' : 'password'}
        label="Password"
        defaultValue="password123"
        rightElement={
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setShow(!show);
            }}
            className="text-foreground-secondary hover:text-brand flex cursor-pointer items-center justify-center transition-colors focus:outline-none"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? (
              <EyeIcon className="size-6" />
            ) : (
              <EyeClosedIcon className="size-6" />
            )}
          </button>
        }
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Title',
    placeholder: 'Placeholder',
    disabled: true,
  },
};
