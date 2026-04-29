'use client';

import * as Label from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';

const inputVariants = cva(
  'flex w-full overflow-hidden border-b bg-transparent transition-all focus-within:outline-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border-stroke',
      },
      size: {
        default: 'h-[56px] px-0 py-2',
      },
      hasError: {
        true: 'border-invalid',
        false: '',
      },
      isFocused: {
        true: 'border-brand',
        false: '',
      },
      isDisabled: {
        true: 'bg-disabled-surface rounded-t-sm px-2 opacity-100',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hasError: false,
      isFocused: false,
      isDisabled: false,
    },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  asChild?: boolean;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      type,
      label,
      error,
      hasError,
      disabled,
      asChild = false,
      leftElement,
      rightElement,
      onFocus,
      onBlur,
      onChange,
      id,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      !!(props.value || props.defaultValue),
    );

    const generatedId = React.useId();
    const inputId = id || generatedId;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue((e.target as HTMLInputElement).value.length > 0);
      onChange?.(e);
    };

    const isError = !!(hasError || error);
    const showLabel = focused || hasValue;

    const Comp = asChild ? Slot : 'input';

    return (
      <div className={cn('flex w-full flex-col gap-2', wrapperClassName)}>
        <div
          className={cn(
            'flex flex-col justify-center',
            inputVariants({
              variant,
              size,
              hasError: isError,
              isFocused: focused && !isError,
              isDisabled: !!disabled,
              className,
            }),
          )}
        >
          {/* Label Container */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-200 ease-in-out',
              showLabel ? 'h-3 opacity-100' : 'h-0 opacity-0',
            )}
          >
            {label && (
              <Label.Root
                htmlFor={inputId}
                className="text-foreground-secondary text-caption block cursor-default"
              >
                {label}
              </Label.Root>
            )}
          </div>

          {/* Input Area with Elements */}
          <div className="flex flex-row items-center gap-2">
            {leftElement && (
              <div className="flex shrink-0 items-center justify-center">
                {leftElement}
              </div>
            )}

            <Comp
              id={inputId}
              type={type}
              disabled={disabled}
              className="placeholder:text-foreground-secondary/50 text-large h-6 w-full flex-1 bg-transparent p-0 outline-none placeholder:opacity-100"
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...props}
            />

            {rightElement && (
              <div className="flex shrink-0 items-center justify-center">
                {rightElement}
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="text-invalid text-caption transition-all">{error}</p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
