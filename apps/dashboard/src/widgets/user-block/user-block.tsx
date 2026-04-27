'use client';

import { useState } from 'react';

import { useMeQuery } from '@workspace/api';
import { Button } from '@workspace/ui';

import { useSignOut } from '@features/auth';

import { UserCard } from '@entities/user';

import { useGetConfirmation } from '@shared/lib';

export function UserBlock({ className }: { className?: string }) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { signOut, isLoading: isSignOutPending } = useSignOut({
    onSuccess: () => {
      setIsRedirecting(true);
      window.location.reload();
    },
  });

  const { data, isLoading, error, refetch, isRefetching } = useMeQuery({
    // Опции для запроса 'me' если нужны
  });

  const getConfirmation = useGetConfirmation();

  const handleLogout = async () => {
    const confirmation = await getConfirmation({
      title: 'Выход из профиля',
      description: 'Вы действительно хотите выйти?',
      confirmText: 'Выйти',
      closeText: 'Отмена',
      disableScroll: true,
      closeOnOutsideClick: false,
    });

    if (!confirmation) return;

    signOut();
  };

  return (
    <UserCard
      user={data}
      isLoading={isLoading}
      error={error as Error}
      className={className}
      actions={{
        renderRefetchButton: () => (
          <Button
            variant="tertiarySecondary"
            onClick={() => refetch()}
            disabled={isLoading || isRefetching || isRedirecting}
          >
            {isRefetching ? 'Обновление...' : 'Обновить'}
          </Button>
        ),
        renderLogoutButton: () => (
          <Button
            variant="tertiaryPrimary"
            onClick={handleLogout}
            disabled={isSignOutPending || isRedirecting}
          >
            {isSignOutPending ? 'Выход...' : 'Выйти'}
          </Button>
        ),
      }}
    />
  );
}
