import { useLogoutMutation } from '@workspace/api';

interface UseSignOutProps {
  onSuccess?: () => void;
}

export function useSignOut({ onSuccess }: UseSignOutProps) {
  const logoutMutation = useLogoutMutation({
    onSuccess,
  });

  const signOut = () => {
    logoutMutation.mutate(undefined);
  };

  return { signOut, isLoading: logoutMutation.isPending };
}
