import React from 'react';

import { EyeClosedIcon, EyeIcon } from '../../icons';
import { Input, InputProps } from '../index';

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onFocus, onBlur, onChange, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      !!(props.value || props.defaultValue),
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      onChange?.(e);
    };

    const showEye = focused || hasValue;

    const onEyeMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShow(!show);
    };

    return (
      <Input
        {...props}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        type={show ? 'text' : 'password'}
        rightElement={
          showEye && (
            <button
              type="button"
              onMouseDown={(e) => onEyeMouseDown(e)}
              className="text-foreground-secondary hover:text-brand flex cursor-pointer items-center justify-center transition-colors focus:outline-none"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? (
                <EyeIcon className="size-6" />
              ) : (
                <EyeClosedIcon className="size-6" />
              )}
            </button>
          )
        }
      />
    );
  },
);
InputPassword.displayName = 'InputPassword';

export { InputPassword };
