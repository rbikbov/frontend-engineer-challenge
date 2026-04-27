import React from 'react';

import { AppLink } from '../../components/link';
import { Logo } from '../../components/logo';
import { cn } from '../../utils/cn';

interface AuthContentLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  contentClassName?: string;
  titleBlock?: React.ReactNode;
}

export const AuthContentLayout: React.FC<AuthContentLayoutProps> = ({
  children,
  title,
  description,
  footer,
  contentClassName,
  titleBlock,
}) => {
  const defaultTitle = (
    <h1 className="text-h1 text-foreground font-medium">{title}</h1>
  );

  return (
    <div className="bg-inverse-primary flex min-h-screen flex-col">
      {/* Top: Logo */}
      <div className="min-h-20 px-5 pt-4">
        <AppLink href="/">
          <Logo width={200} height={40} />
        </AppLink>
      </div>

      {/* Center: Form content */}
      <div className="text-primary flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
        <div className={cn('mx-auto w-full', contentClassName)}>
          <div className="mb-6 text-left">
            {titleBlock ? titleBlock : defaultTitle}

            {description && (
              <p className="text-foreground-secondary mt-6 text-base">
                {description}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>

      {/* Bottom: Footer link */}
      {footer && (
        <div className="min-h-19 border-t border-[#ededee] p-8">
          <div className={cn('mx-auto text-center', contentClassName)}>
            {footer}
          </div>
        </div>
      )}
    </div>
  );
};
