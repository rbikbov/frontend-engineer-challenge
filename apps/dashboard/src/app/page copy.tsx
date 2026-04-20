'use client';

import { Button, Logo, Input, SearchIcon } from '@workspace/ui';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="bg-background text-foreground flex h-screen overflow-hidden">
      {/* Sidebar Placeholder */}
      <aside className="border-stroke bg-surface/30 hidden w-64 flex-col border-r p-6 lg:flex">
        <div className="mb-10">
          <Logo />
        </div>

        <nav className="flex-1 space-y-2">
          {['Overview', 'Projects', 'Analytics', 'Settings'].map((item) => (
            <div
              key={item}
              className="rounded-button-sm text-foreground-secondary hover:bg-surface hover:text-foreground cursor-pointer px-4 py-2 transition-colors"
            >
              {item}
            </div>
          ))}
        </nav>

        <div className="border-stroke border-t pt-6">
          <Button
            variant="tertiarySecondary"
            className="w-full justify-start px-4"
          >
            Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-auto">
        {/* Header */}
        <header className="border-stroke bg-background/80 backdrop-blur-glass sticky top-0 z-10 flex h-16 items-center justify-between border-b px-8">
          <div className="w-96">
            <Input
              placeholder="Search dashboards..."
              leftElement={<SearchIcon className="text-foreground-secondary" />}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-foreground-secondary hidden text-sm sm:block">
              Welcome,{' '}
              <span className="text-foreground font-medium">Guest User</span>
            </div>
            <div className="bg-brand/20 border-brand/20 text-brand flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold">
              GU
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl p-8">
          <div className="mb-8">
            <h1 className="text-h1 mb-2">Dashboard</h1>
            <p className="text-foreground-secondary">
              Welcome back! Here is what's happening with your projects today.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Total Revenue',
                value: '$24,500',
                change: '+12.5%',
                color: 'text-brand',
              },
              {
                title: 'Active Users',
                value: '1,240',
                change: '+18.2%',
                color: 'text-brand',
              },
              {
                title: 'Performance',
                value: '98.2%',
                change: '+0.4%',
                color: 'text-brand',
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-surface/50 border-stroke rounded-button-lg hover:border-brand/30 group border p-6 transition-all"
              >
                <h3 className="text-foreground-secondary group-hover:text-brand mb-2 text-sm font-medium transition-colors">
                  {stat.title}
                </h3>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-brand bg-brand/10 rounded-full px-2 py-0.5 text-xs font-semibold">
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for more content */}
          <div className="border-stroke rounded-button-lg mt-10 flex flex-col items-center justify-center border-2 border-dashed p-10 text-center">
            <div className="bg-surface mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Logo className="text-foreground-secondary h-8 w-8 opacity-50" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Build your dashboard</h3>
            <p className="text-foreground-secondary mb-6 max-w-sm">
              Start adding widgets and integrations to visualize your
              engineering metrics in real-time.
            </p>
            <Button variant="primary" asChild>
              <Link href="/">Back to Main</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
