'use client';

import {
  AUTH_LINKS,
  DASHBOARD_LINKS,
  REPOSITORY_LINKS,
  ROOT_LINK,
} from '@workspace/constants';
import { AppLink, Button, Logo } from '@workspace/ui/components';

export default function Index() {
  return (
    <div className="bg-background text-foreground selection:bg-brand/20 relative min-h-screen overflow-hidden">
      {/* Background Blobs */}
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
          <p className="text-foreground-secondary mb-8 text-xs font-bold tracking-wider uppercase">
            ATLS Academy &middot; Frontend challenge
          </p>

          <h1 className="mb-8 text-5xl leading-[1.1] font-extrabold tracking-tight sm:text-7xl">
            Orbitto{' '}
            <span className="from-brand to-brand-hover bg-linear-to-r bg-clip-text text-transparent">
              Service
            </span>
          </h1>

          <p className="text-foreground-secondary mx-auto mb-12 max-w-2xl text-xl leading-relaxed sm:text-2xl">
            Sign-up, sign-in and password recovery on top of a GraphQL backend,
            with cookie-based sessions behind a BFF.
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
              <AppLink href={AUTH_LINKS.SIGN_UP}>Create account</AppLink>
            </Button>
          </div>

          <p className="text-foreground-secondary mt-8 text-sm">
            Already signed in?{' '}
            <AppLink
              toOtherZone
              href={DASHBOARD_LINKS.ROOT}
              className="text-brand hover:text-brand-hover font-medium"
            >
              Open the dashboard
            </AppLink>
          </p>
        </section>

        {/* Key decisions, each backed by an ADR */}
        <div className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-8 text-left sm:grid-cols-3">
          {[
            {
              adr: 'ADR-001',
              href: REPOSITORY_LINKS.ADR_MULTI_ZONES,
              title: 'Multi-Zones',
              desc: 'Auth and dashboard are separate Next.js apps under one domain, sharing UI, API and config libraries.',
            },
            {
              adr: 'ADR-002',
              href: REPOSITORY_LINKS.ADR_SECURE_AUTH,
              title: 'Sessions behind a BFF',
              desc: 'Tokens live in HttpOnly cookies. Only login, refresh and logout go through Next.js route handlers.',
            },
            {
              adr: 'ADR-003',
              href: REPOSITORY_LINKS.ADR_FSD,
              title: 'FSD and dependency inversion',
              desc: 'ESLint enforces layer boundaries. The API client is injected through an interface.',
            },
          ].map((decision) => (
            <a
              key={decision.adr}
              href={decision.href}
              target="_blank"
              rel="noreferrer"
              className="group bg-surface border-stroke rounded-button-lg hover:border-brand/30 border p-6 transition-colors"
            >
              <p className="text-brand mb-4 font-mono text-xs font-bold">
                {decision.adr}
              </p>
              <h3 className="mb-2 font-bold">{decision.title}</h3>
              <p className="text-foreground-secondary mb-4 text-sm leading-relaxed">
                {decision.desc}
              </p>
              <span className="text-foreground-secondary group-hover:text-brand text-sm transition-colors">
                Read the decision &rsaquo;
              </span>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-stroke relative z-10 border-t py-10 text-center">
        <p className="text-foreground-secondary text-sm opacity-60">
          &copy; 2026 Orbitto Service &middot;{' '}
          <a
            href={REPOSITORY_LINKS.ROOT}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand underline-offset-4 hover:underline"
          >
            Source on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
