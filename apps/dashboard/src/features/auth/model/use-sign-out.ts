import { useBffLogoutMutation } from '@workspace/api';

interface UseSignOutProps {
  onSuccess?: () => void;
}

export function useSignOut({ onSuccess }: UseSignOutProps) {
  const logoutMutation = useBffLogoutMutation({
    onSuccess,
  });

  const signOut = () => {
    logoutMutation.mutate(undefined);
  };

  return { signOut, isLoading: logoutMutation.isPending };
}
