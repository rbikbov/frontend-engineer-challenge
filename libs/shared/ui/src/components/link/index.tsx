import React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// Атрибуты обычного тега <a>
type AnchorProps = React.ComponentPropsWithoutRef<'a'>;

// Пропсы для ссылок внутри зоны
type AppLinkPropsInsideZone = NextLinkProps &
  Omit<AnchorProps, 'href'> & {
    toOtherZone?: false;
  };

// Пропсы для ссылок между зонами
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
