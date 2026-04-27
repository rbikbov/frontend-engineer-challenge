'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useAuthApi, type User } from '@workspace/api';
import { QUERY_KEYS } from '@workspace/constants';

export const useMeQuery = (): UseQueryResult<User> => {
  const api = useAuthApi();
  return useQuery({
    queryKey: [QUERY_KEYS.USER_ME],
    queryFn: () => api.me(),
    retry: false,
  });
};
