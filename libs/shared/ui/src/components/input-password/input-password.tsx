import React from 'react';

import { EyeClosedIcon, EyeIcon } from '../../icons';
import { Input, InputProps } from '../index';

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [show, setShow] = React.useState(false);

    const onEyeMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShow(!show);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type={show ? 'text' : 'password'}
        rightElement={
          // Visibility follows the input-active variant (focus/value/autofill), see theme.css
          <button
            type="button"
            onMouseDown={(e) => onEyeMouseDown(e)}
            className="text-foreground-secondary hover:text-brand input-active:flex hidden cursor-pointer items-center justify-center transition-colors focus:outline-none"
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
);
InputPassword.displayName = 'InputPassword';

export { InputPassword };
