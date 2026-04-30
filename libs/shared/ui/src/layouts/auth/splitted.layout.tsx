import React from 'react';

import { EllipsesIllustration } from '../../components/ellipses-illustration';

const IllustrationColumn = React.memo(() => (
  <section className="relative hidden flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-[#EBEFF4] to-[#E4EBF3] lg:flex">
    <EllipsesIllustration className="m-8 h-[480px] w-[512px]" />
  </section>
));

export const AuthSplittedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="bg-inverse-primary flex min-h-screen flex-col overflow-hidden lg:flex-row">
      {/* Left Column: Form Column */}
      <section className="w-full lg:w-[560px]">{children}</section>

      {/* Right Column: Illustration Sidebar */}
      <IllustrationColumn />
    </main>
  );
};
AuthSplittedLayout.displayName = 'AuthSplittedLayout';
