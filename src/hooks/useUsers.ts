import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useUsers = () => {
  // ✅ FETCH USERS

  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  // ✅ RETURN

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
