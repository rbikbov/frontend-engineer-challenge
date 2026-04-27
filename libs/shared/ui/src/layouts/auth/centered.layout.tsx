import React from 'react';

export const AuthCenteredLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="bg-inverse-primary flex min-h-screen flex-col overflow-hidden lg:flex-row">
      <section className="w-full">{children}</section>
    </main>
  );
};
