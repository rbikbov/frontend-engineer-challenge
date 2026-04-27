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
    <div
      className={cn(
        'bg-card text-card-foreground rounded-lg border p-4 shadow-sm',
        className,
      )}
    >
      <h2 className="mb-4 text-xl font-bold">User Profile</h2>

      <div className="mb-6">
        {isLoading ? (
          <p className="text-disabled">Loading user data...</p>
        ) : error ? (
          <p className="text-destructive">Error: {error.message}</p>
        ) : user ? (
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">
              ID: <span className="text-foreground font-mono">{user.id}</span>
            </p>
            <p className="text-muted-foreground text-sm">
              Email: <span className="text-foreground">{user.email}</span>
            </p>
          </div>
        ) : (
          <p className="text-disabled">No user data available</p>
        )}
      </div>

      <div className="flex gap-2">
        {actions?.renderRefetchButton?.()}
        {actions?.renderLogoutButton?.()}
      </div>
    </div>
  );
}
