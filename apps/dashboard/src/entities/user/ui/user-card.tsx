import React, { ReactNode } from 'react';

import type { User } from '@workspace/api';
import { cn } from '@workspace/ui/utils/cn';

export interface UserCardProps {
  user?: User;
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
  actions?: {
    renderLogoutButton?: () => ReactNode;
    renderRefetchButton?: () => ReactNode;
  };
}

export function UserCard({
  user,
  isLoading,
  error,
  className,
  actions,
}: UserCardProps) {
  return (
    <section
      aria-labelledby="user-card-title"
      aria-busy={isLoading}
      className={cn(
        'bg-surface border-stroke rounded-button-lg border p-6',
        className,
      )}
    >
      <h2 id="user-card-title" className="text-h3 mb-6 font-bold">
        Profile
      </h2>

      <div className="mb-8">
        {isLoading ? (
          <div className="space-y-5">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-2">
                <div className="bg-stroke h-3 w-16 animate-pulse rounded" />
                <div className="bg-stroke h-5 w-56 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p role="alert" className="text-invalid text-large">
            Could not load the profile: {error.message}
          </p>
        ) : user ? (
          <dl className="space-y-5">
            <div>
              <dt className="text-foreground-secondary text-caption mb-2">
                Email
              </dt>
              <dd className="text-large break-all">{user.email}</dd>
            </div>
            <div>
              <dt className="text-foreground-secondary text-caption mb-2">
                User ID
              </dt>
              <dd className="font-mono text-sm break-all">{user.id}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-foreground-secondary">No user data available</p>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        {actions?.renderRefetchButton?.()}
        {actions?.renderLogoutButton?.()}
      </div>
    </section>
  );
}
