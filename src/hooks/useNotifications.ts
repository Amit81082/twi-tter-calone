// src/hooks/useNotification.ts

import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotification = (userId?: string) => {
  const url = userId ? `/api/notifications?userId=${userId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });

  return {
    data: data ?? [],
    error,
    isLoading,
    mutate,
  };
};

export default useNotification;
