import { envConfig } from '@workspace/config/env';
import { ROOT_LINK } from '@workspace/constants';
import { AppLink, Logo } from '@workspace/ui/components';

import { SessionInfo } from '@widgets/session-info';
import { UserBlock } from '@widgets/user-block';

const mainAppUrl = envConfig.NEXT_PUBLIC_APP_URL ?? ROOT_LINK;

export default function Index() {
  return (
    <div className="bg-background text-foreground selection:bg-brand/20 min-h-screen font-sans">
      <header className="border-stroke border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <AppLink toOtherZone href={mainAppUrl} aria-label="Orbitto home">
            <Logo />
          </AppLink>
          <AppLink
            toOtherZone
            href={mainAppUrl}
            className="text-button text-foreground-secondary hover:text-brand-hover transition-colors"
          >
            &lsaquo; Back to main
          </AppLink>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <h1 className="text-h1 mb-3 font-bold">Account</h1>
        <p className="text-foreground-secondary text-large mb-10 max-w-2xl">
          This page is served by the separate dashboard zone. The middleware of
          the main zone lets you in only with a session cookie.
        </p>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <UserBlock />
          <SessionInfo />
        </div>
      </main>
    </div>
  );
}
