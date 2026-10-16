import React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// Attributes of a regular <a> tag
type AnchorProps = React.ComponentPropsWithoutRef<'a'>;

// Props for links within the zone
type AppLinkPropsInsideZone = NextLinkProps &
  Omit<AnchorProps, 'href'> & {
    toOtherZone?: false;
  };

// Props for links between zones
type AppLinkPropsOutsideZone = AnchorProps & {
  toOtherZone: true;
};

type AppLinkProps = AppLinkPropsInsideZone | AppLinkPropsOutsideZone;

const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  (allProps, ref) => {
    if (allProps.toOtherZone) {
      const {
        toOtherZone: _,
        children,
        ...props
      } = allProps as AppLinkPropsOutsideZone;
      return (
        <a {...props} ref={ref}>
          {children}
        </a>
      );
    }

    const {
      toOtherZone: _,
      children,
      ...props
    } = allProps as AppLinkPropsInsideZone;
    return (
      <NextLink {...props} ref={ref}>
        {children}
      </NextLink>
    );
  },
);

AppLink.displayName = 'AppLink';

export { AppLink };
export type { AppLinkProps };
