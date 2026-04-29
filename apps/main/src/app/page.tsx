'use client';

import { AUTH_LINKS, DASHBOARD_LINKS, ROOT_LINK } from '@workspace/constants';
import { AppLink, Button, Logo } from '@workspace/ui/components';

export default function Index() {
  return (
    <div className="bg-background text-foreground selection:bg-brand/20 relative min-h-screen overflow-hidden">
      {/* Background Blobs (Premium Aesthetic) */}
      <div className="bg-brand/10 pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-[120px]" />
      <div className="bg-brand/5 pointer-events-none absolute top-1/2 -right-48 h-[500px] w-[500px] rounded-full blur-[160px]" />

      {/* Top Navigation Bar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <AppLink href={ROOT_LINK}>
          <Logo />
        </AppLink>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center">
        <section className="border-stroke bg-surface/40 shadow-brand/5 mx-auto max-w-4xl rounded-[40px] border p-8 shadow-2xl sm:p-16">
          <div className="bg-brand/10 border-brand/20 text-brand mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="bg-brand absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-brand relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            Next.js 15 + FSD Architecture
          </div>

          <h1 className="mb-8 text-5xl leading-[1.1] font-extrabold tracking-tight sm:text-7xl">
            Orbitto{' '}
            <span className="from-brand to-brand-hover bg-linear-to-r bg-clip-text text-transparent">
              Service
            </span>
          </h1>

          <p className="text-foreground-secondary mx-auto mb-12 max-w-2xl text-xl leading-relaxed sm:text-2xl">
            High-performance engineering challenge solution with strict
            architectural boundaries and state-of-the-art aesthetics.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="primary"
              className="h-14 w-full px-10 text-lg sm:w-auto"
              asChild
            >
              <AppLink href={AUTH_LINKS.SIGN_IN}>Sign in</AppLink>
            </Button>
            <Button
              variant="secondaryMain"
              className="h-14 w-full px-10 text-lg sm:w-auto"
              asChild
            >
              <AppLink toOtherZone href={DASHBOARD_LINKS.ROOT}>
                View Dashboard
              </AppLink>
            </Button>
          </div>
        </section>

        {/* Feature Cards Sneak-Peek */}
        <div className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-8 text-left sm:grid-cols-3">
          {[
            {
              title: 'FSD Standards',
              desc: 'Strict layer isolation enforced by ESLint to keep the codebase maintainable.',
            },
            {
              title: 'Tailwind v4',
              desc: 'The latest styling engine for lightning-fast UI development and clean CSS.',
            },
            {
              title: 'Monorepo',
              desc: 'Powered by Nx for efficient package sharing and optimized build pipelines.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group bg-surface border-stroke rounded-button-lg hover:border-brand/30 border p-6 transition-all"
            >
              <div className="bg-brand/10 text-brand group-hover:bg-brand mb-4 flex h-10 w-10 items-center justify-center rounded font-bold transition-colors group-hover:text-white">
                {i + 1}
              </div>
              <h3 className="mb-2 font-bold">{feature.title}</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="border-stroke relative z-10 border-t py-10 text-center">
        <p className="text-foreground-secondary text-sm opacity-60">
          &copy; 2026 Orbitto Service Engineering Challenge.
          <br className="sm:hidden" />
          Designed with ❤️ and strict FSD principles.
        </p>
      </footer>
    </div>
  );
}
