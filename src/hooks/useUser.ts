import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useUser = (userId?: string) => {
  // ✅ FETCH USER

  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,

    fetcher,
  );

  // ✅ RETURN

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
