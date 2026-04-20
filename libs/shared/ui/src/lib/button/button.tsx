import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';

const buttonVariants = cva(
  // Base: layout + typography + border reset + focus/disabled
  'focus-visible:ring-brand inline-flex cursor-pointer items-center justify-center border border-transparent text-sm leading-none font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      // variant = только визуальная идентичность (цвет, фон, скругление)
      variant: {
        primary:
          'rounded-button-lg bg-brand hover:bg-brand-hover active:bg-brand-active disabled:bg-disabled text-white',

        secondaryMain:
          'rounded-button-lg bg-brand/10 text-brand hover:bg-brand/15 active:bg-brand/20 disabled:bg-disabled-surface disabled:text-disabled',

        secondarySecondary:
          'rounded-button-sm bg-surface text-foreground hover:text-brand-hover active:text-brand-active disabled:text-disabled disabled:border-stroke',

        tertiaryPrimary:
          'text-brand hover:text-brand-hover active:text-brand-active disabled:text-disabled border-0',

        tertiarySecondary:
          'text-foreground-secondary hover:text-brand-hover active:text-brand-active disabled:text-disabled border-0',

        link: 'text-foreground hover:text-brand-hover active:text-brand-active disabled:text-disabled border-0 text-xl leading-[1.2]',
      },
      // size = только геометрия (высота, padding)
      size: {
        default: 'h-12 px-4 py-3',
        text: 'h-auto p-0',
        other: 'h-10 px-3 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
